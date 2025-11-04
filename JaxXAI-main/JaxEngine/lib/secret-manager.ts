import crypto from "crypto"

type SecretRecord = {
  id: string
  name: string
  provider: string
  createdAt: string
  createdBy: string
  encryptedValue: string
  maskedPreview: string
}

export type SecretSummary = {
  id: string
  name: string
  provider: string
  createdAt: string
  createdBy: string
  maskedPreview: string
}

export type CreateSecretInput = {
  name: string
  value: string
  provider?: string
  createdBy?: string
}

const STORE_SYMBOL = Symbol.for("jaxengine.secret-store")

function getStore(): Map<string, SecretRecord> {
  const globalAny = globalThis as unknown as { [STORE_SYMBOL]?: Map<string, SecretRecord> }
  if (!globalAny[STORE_SYMBOL]) {
    globalAny[STORE_SYMBOL] = new Map<string, SecretRecord>()
  }
  return globalAny[STORE_SYMBOL]!
}

function getEncryptionKey(): Buffer {
  const secret = process.env.SECRET_MANAGER_KEY || process.env.ADMIN_SECRET_KEY
  if (!secret) {
    throw new Error(
      "Secret manager encryption key is not configured. Set SECRET_MANAGER_KEY (or reuse ADMIN_SECRET_KEY) in your environment.",
    )
  }
  return crypto.createHash("sha256").update(secret).digest()
}

function encrypt(value: string): string {
  const key = getEncryptionKey()
  const iv = crypto.randomBytes(12)
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv)
  const encrypted = Buffer.concat([cipher.update(value, "utf8"), cipher.final()])
  const authTag = cipher.getAuthTag()
  return Buffer.concat([iv, authTag, encrypted]).toString("base64")
}

function decrypt(payload: string): string {
  const key = getEncryptionKey()
  const buffer = Buffer.from(payload, "base64")
  const iv = buffer.subarray(0, 12)
  const authTag = buffer.subarray(12, 28)
  const encrypted = buffer.subarray(28)
  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv)
  decipher.setAuthTag(authTag)
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()])
  return decrypted.toString("utf8")
}

function maskSecret(value: string): string {
  if (!value) return ""
  if (value.length <= 4) {
    return "*".repeat(value.length)
  }
  const tail = value.slice(-4)
  return `${"*".repeat(Math.max(0, value.length - 4))}${tail}`
}

function toSummary(record: SecretRecord): SecretSummary {
  return {
    id: record.id,
    name: record.name,
    provider: record.provider,
    createdAt: record.createdAt,
    createdBy: record.createdBy,
    maskedPreview: record.maskedPreview,
  }
}

export function saveSecret(input: CreateSecretInput): SecretSummary {
  const { name, value, provider = "general", createdBy = "dashboard" } = input

  if (!name?.trim() || !value?.trim()) {
    throw new Error("Both name and value are required to store a secret.")
  }

  const store = getStore()
  const id = crypto.randomUUID()
  const encryptedValue = encrypt(value.trim())
  const createdAt = new Date().toISOString()
  const maskedPreview = maskSecret(value.trim())

  const record: SecretRecord = {
    id,
    name: name.trim(),
    provider,
    createdAt,
    createdBy,
    encryptedValue,
    maskedPreview,
  }

  store.set(id, record)
  return toSummary(record)
}

export function listSecrets(): SecretSummary[] {
  const store = getStore()
  return Array.from(store.values()).map(toSummary)
}

export function getSecret(id: string): (SecretSummary & { value: string }) | null {
  if (!id) return null
  const store = getStore()
  const record = store.get(id)
  if (!record) return null
  const value = decrypt(record.encryptedValue)
  return {
    ...toSummary(record),
    value,
  }
}

export function deleteSecret(id: string): boolean {
  if (!id) return false
  const store = getStore()
  return store.delete(id)
}
