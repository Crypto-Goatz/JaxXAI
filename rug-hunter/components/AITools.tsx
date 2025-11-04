import React, { useState, useCallback, ChangeEvent } from 'react';
// import { GoogleGenAI, Modality } from '@google/genai'; // No longer needed directly here
import { SparklesIcon, PhotoIcon } from './icons';
import { analyzeStrategyWithThinking, generateImage, editImage as editImageService } from '../services/geminiService';

const toBase64 = (file: File): Promise<{base64: string, mimeType: string}> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const result = reader.result as string;
        const mimeType = result.split(':')[1].split(';')[0];
        const base64 = result.split(',')[1];
        resolve({ base64, mimeType });
    };
    reader.onerror = error => reject(error);
});


const StrategyAnalyzer: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [result, setResult] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setResult('');
        // FIX: Use centralized Gemini service
        const response = await analyzeStrategyWithThinking(prompt);
        setResult(response);
        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#00f5d4]">Deep Dive Strategy Analysis (AI)</h3>
            <p className="text-sm text-gray-400">Ask complex questions about your trading data. Our AI will use "Thinking Mode" with Gemini 2.5 Pro for in-depth analysis.</p>
            <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'Analyze my winning trades from the last 7 days. What are the common signals and what's the optimal hold time?'"
                className="w-full h-32 p-3 bg-purple-900/50 border border-purple-700 rounded-lg focus:ring-2 focus:ring-[#00f5d4] focus:outline-none transition-colors"
            />
            <button
                onClick={handleAnalyze}
                disabled={isLoading}
                className="w-full flex items-center justify-center bg-[#00f5d4] text-black font-bold py-3 px-6 rounded-lg hover:bg-teal-300 transition-all duration-300 disabled:bg-gray-600 transform hover:scale-105"
            >
                {isLoading ? (
                    <>
                        <SparklesIcon className="h-5 w-5 mr-2 animate-pulse" />
                        AI is Thinking...
                    </>
                ) : (
                    'Run Deep Dive Analysis'
                )}
            </button>
            {result && (
                <div className="mt-4 p-4 bg-purple-900/30 border border-purple-800/50 rounded-lg">
                    <h4 className="font-bold text-white mb-2">Analysis Result:</h4>
                    <p className="text-gray-300 whitespace-pre-wrap">{result}</p>
                </div>
            )}
        </div>
    );
};

const ImageGenerator: React.FC = () => {
    const [prompt, setPrompt] = useState('');
    const [aspectRatio, setAspectRatio] = useState('1:1');
    const [image, setImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        if (!prompt) return;
        setIsLoading(true);
        setImage(null);
        // FIX: Use centralized Gemini service
        const imageUrl = await generateImage(prompt, aspectRatio);
        setImage(imageUrl);
        setIsLoading(false);
    };

    return (
         <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#00f5d4]">AI Image Generator</h3>
            <p className="text-sm text-gray-400">Generate a unique image for your profile or as a reward badge using Imagen 4.</p>
            <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'A crypto goat in a spacesuit on the moon'"
                className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg focus:ring-2 focus:ring-[#00f5d4] focus:outline-none transition-colors"
            />
            <select
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value)}
                className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg focus:ring-2 focus:ring-[#00f5d4] focus:outline-none transition-colors"
            >
                <option value="1:1">Square (1:1)</option>
                <option value="16:9">Landscape (16:9)</option>
                <option value="9:16">Portrait (9:16)</option>
            </select>
            <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full bg-[#00f5d4] text-black font-bold py-3 px-6 rounded-lg hover:bg-teal-300 transition-all duration-300 disabled:bg-gray-600 transform hover:scale-105"
            >
                {isLoading ? 'Generating...' : 'Generate Image'}
            </button>
            {isLoading && <div className="text-center p-8">Generating your masterpiece... Please wait.</div>}
            {image && (
                <div className="mt-4">
                    <img src={image} alt="Generated by AI" className="rounded-lg mx-auto max-h-96" />
                </div>
            )}
        </div>
    );
};


const ImageEditor: React.FC = () => {
    const [originalImage, setOriginalImage] = useState<File | null>(null);
    const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
    const [editedImageUrl, setEditedImageUrl] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setOriginalImage(file);
            setOriginalImageUrl(URL.createObjectURL(file));
            setEditedImageUrl(null);
        }
    };
    
    const handleEdit = async () => {
        if (!originalImage || !prompt) return;
        setIsLoading(true);
        setEditedImageUrl(null);
        // FIX: Convert file to base64 and use centralized Gemini service
        const { base64, mimeType } = await toBase64(originalImage);
        const resultUrl = await editImageService(base64, mimeType, prompt);
        setEditedImageUrl(resultUrl);
        setIsLoading(false);
    };

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#00f5d4]">AI Image Editor</h3>
            <p className="text-sm text-gray-400">Upload an image and use a text prompt to edit it with Gemini 2.5 Flash Image.</p>
            
            {!originalImageUrl && (
                 <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-purple-600 rounded-lg cursor-pointer hover:bg-purple-800/40 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <PhotoIcon className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </div>
                    <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                </label>
            )}

            {originalImageUrl && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-bold text-center mb-2">Original</h4>
                        <img src={originalImageUrl} alt="Original" className="rounded-lg w-full" />
                    </div>
                    <div>
                        <h4 className="font-bold text-center mb-2">Edited</h4>
                        <div className="w-full h-full bg-purple-900/50 rounded-lg flex items-center justify-center">
                        {isLoading ? (
                            <p>Editing...</p>
                        ) : editedImageUrl ? (
                            <img src={editedImageUrl} alt="Edited" className="rounded-lg w-full" />
                        ) : (
                            <p className="text-gray-500">Edit result will appear here</p>
                        )}
                        </div>
                    </div>
                </div>
            )}
            
            {originalImage && (
                <>
                <input
                    type="text"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Add a retro filter' or 'Make it look like a painting'"
                    className="w-full p-3 bg-purple-900/50 border border-purple-700 rounded-lg focus:ring-2 focus:ring-[#00f5d4] focus:outline-none transition-colors"
                    />
                <button
                    onClick={handleEdit}
                    disabled={isLoading || !prompt}
                    className="w-full bg-[#00f5d4] text-black font-bold py-3 px-6 rounded-lg hover:bg-teal-300 transition-all duration-300 disabled:bg-gray-600 transform hover:scale-105"
                >
                    {isLoading ? 'Editing...' : 'Apply AI Edit'}
                </button>
                 </>
            )}

        </div>
    );
};

type AITab = 'analyzer' | 'generator' | 'editor';

const AITools: React.FC = () => {
    const [activeTab, setActiveTab] = useState<AITab>('analyzer');
    
    const TabButton: React.FC<{tab: AITab, label: string}> = ({ tab, label }) => (
        <button 
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-bold rounded-t-lg transition-colors outline-none ${
                activeTab === tab 
                ? 'bg-purple-900/40 text-teal-300 border-b-2 border-teal-300' 
                : 'text-gray-400 hover:bg-purple-800/40'
            }`}
        >
            {label}
        </button>
    );

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">AI Toolkit</h1>
            <div className="border-b border-purple-800/50">
                <TabButton tab="analyzer" label="Strategy Analyzer" />
                <TabButton tab="generator" label="Image Generator" />
                <TabButton tab="editor" label="Image Editor" />
            </div>
            <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/30 backdrop-blur-md border border-purple-800/50 rounded-xl p-6 shadow-2xl shadow-black/20">
                {activeTab === 'analyzer' && <StrategyAnalyzer />}
                {activeTab === 'generator' && <ImageGenerator />}
                {activeTab === 'editor' && <ImageEditor />}
            </div>
        </div>
    );
};

export default AITools;