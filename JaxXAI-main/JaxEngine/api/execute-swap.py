"""
Vercel Python Serverless Function
Executes a Solana swap via Jupiter API using a configured wallet.
"""

import base64
import json
import os

import requests
from solders.keypair import Keypair
from solders.transaction import VersionedTransaction
from solana.rpc.api import Client


QUOTES_URL = "https://quote-api.jup.ag/v6/quote"
SWAP_URL = "https://quote-api.jup.ag/v6/swap"


def handler(request):
    if request.method != "POST":
        return _response({"error": "Method not allowed"}, status=405, headers={"Allow": "POST"})

    private_key_raw = os.getenv("PRIVATE_KEY")
    if not private_key_raw:
        return _response({"error": "PRIVATE_KEY environment variable is missing."}, status=500)

    try:
        body = _parse_request_body(request)
    except ValueError as exc:
        return _response({"error": str(exc)}, status=400)

    required_fields = ["inputMint", "outputMint", "amount"]
    missing = [field for field in required_fields if field not in body]
    if missing:
        return _response({"error": f"Missing fields: {', '.join(missing)}"}, status=400)

    user_public_key = body.get("userPublicKey")
    if not user_public_key:
        try:
            keypair = _load_keypair(private_key_raw)
            user_public_key = str(keypair.pubkey())
        except ValueError as exc:
            return _response({"error": str(exc)}, status=500)
    else:
        keypair = _load_keypair(private_key_raw)

    amount = int(body["amount"])
    slippage_bps = int(body.get("slippageBps", 50))
    quote_params = {
        "inputMint": body["inputMint"],
        "outputMint": body["outputMint"],
        "amount": amount,
        "slippageBps": slippage_bps,
    }

    if "swapMode" in body:
        quote_params["swapMode"] = body["swapMode"]

    try:
        quote_response = requests.get(QUOTES_URL, params=quote_params, timeout=15)
        quote_response.raise_for_status()
        quote = quote_response.json()
    except requests.RequestException as exc:
        return _response({"error": f"Quote request failed: {exc}"}, status=502)

    swap_payload = {
        "quoteResponse": quote,
        "userPublicKey": user_public_key,
        "wrapAndUnwrapSol": True,
        "useSharedAccounts": True,
    }

    if "dynamicSlippage" in body:
        swap_payload["dynamicSlippage"] = body["dynamicSlippage"]

    try:
        swap_response = requests.post(SWAP_URL, json=swap_payload, timeout=20)
        swap_response.raise_for_status()
        swap_data = swap_response.json()
        swap_tx = swap_data.get("swapTransaction")
        if not swap_tx:
            raise ValueError("Swap transaction not returned from Jupiter.")
    except (requests.RequestException, ValueError) as exc:
        return _response({"error": f"Swap build failed: {exc}"}, status=502)

    try:
        tx_bytes = base64.b64decode(swap_tx)
        versioned_tx = VersionedTransaction.from_bytes(tx_bytes)
        versioned_tx.sign([keypair])
        rpc_url = os.getenv("SOLANA_RPC_URL", "https://api.mainnet-beta.solana.com")
        client = Client(rpc_url)
        send_response = client.send_raw_transaction(bytes(versioned_tx))

        if send_response.get("error"):
            raise ValueError(send_response["error"])

        signature = send_response["result"]
    except Exception as exc:  # pylint: disable=broad-except
        return _response({"error": f"Failed to execute swap: {exc}"}, status=500)

    return _response({"tx_signature": signature, "quote": quote}, status=200)


def _parse_request_body(request):
    if not request.body:
        raise ValueError("Request body is empty.")
    try:
        if isinstance(request.body, bytes):
            return json.loads(request.body.decode("utf-8"))
        if isinstance(request.body, str):
            return json.loads(request.body)
        return request.body
    except json.JSONDecodeError as exc:
        raise ValueError(f"Invalid JSON payload: {exc}") from exc


def _load_keypair(value):
    try:
        cleaned = value.strip()
        if cleaned.startswith("["):
            # JSON array format
            secret_key = json.loads(cleaned)
            return Keypair.from_bytes(bytes(secret_key))
        return Keypair.from_base58_string(cleaned)
    except Exception as exc:  # pylint: disable=broad-except
        raise ValueError("PRIVATE_KEY is not a valid JSON array or base58 string.") from exc


def _response(body, status=200, headers=None):
    return {
        "statusCode": status,
        "headers": {"Content-Type": "application/json", **(headers or {})},
        "body": json.dumps(body),
    }

