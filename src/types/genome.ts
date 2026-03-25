/**
 * Agent Genome Types and Interfaces
 */

export interface Concept {
  id: string;
  name: string;
  embedding: number[];
  relationships: Relationship[];
  factualAssociations: string[];
}

export interface Relationship {
  target: string;
  type: "enables" | "requires" | "contradicts" | "similar" | "related";
  strength: number; // 0-1
}

export interface SemanticKnowledge {
  concepts: Concept[];
  knowledgeGraph: string; // IPFS hash or URL
  compressionRatio: number;
  originalSize: number;
  compressedSize: number;
}

export interface PersonalityTraits {
  curiosity: number;
  precision: number;
  creativity: number;
  caution: number;
  [key: string]: number;
}

export interface BehavioralCodex {
  personality: {
    traits: PersonalityTraits;
    responseStyle: string;
    ethicalGuidelines: string[];
  };
  decisionLogic: {
    reasoning: string;
    confidenceThreshold: number;
    fallbackStrategy: string;
  };
  responseTemplates: ResponseTemplate[];
}

export interface ResponseTemplate {
  trigger: string;
  template: string;
}

export interface InferenceEngine {
  type: string;
  framework: string;
  quantization: string;
  optimizations: string[];
}

export interface ModelWeights {
  location: string; // IPFS, URL, or blockchain address
  hash: string;
  size: number;
  format: string;
  quantized: boolean;
  quantizationLevel?: number;
}

export interface ComputeEndpoint {
  provider: string;
  model: string;
  apiKey: string; // encrypted
}

export interface ExecutionPointers {
  inferenceEngine: InferenceEngine;
  modelWeights: ModelWeights;
  computeEndpoints: ComputeEndpoint[];
  fallbackChain: string[];
}

export interface GeometricCoordinates {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface NearbyAgent {
  agentId: string;
  distance: number;
  relationship: string;
}

export interface GeometricAddress {
  coordinates: GeometricCoordinates;
  resonanceSignature: string;
  semanticHash: string;
  distanceToNearestAgents: NearbyAgent[];
}

export interface BlockchainInjectionStrategy {
  name: string;
  chain: string;
  cost: number;
  storageLocation: string;
  txHash?: string;
  blockNumber?: number;
  retrievalPointer: string;
}

export interface BlockchainInjection {
  strategies: BlockchainInjectionStrategy[];
  totalCost: number;
  totalStorage: number;
  costPerMB: number;
  retrievalEndpoints: string[];
}

export interface Cryptography {
  publicKey: string;
  signatureAlgorithm: string;
  genomeHash: string;
  encryptionKey: string; // encrypted
  integrityProof: string;
}

export interface VersionEntry {
  version: string;
  date: string;
  changes: string;
  blockchainProof: string;
}

export interface AgentGenome {
  version: string;
  agentId: string;
  timestamp: number;
  metadata: {
    name: string;
    description: string;
    version: string;
    author: string;
    license: string;
  };
  semanticKnowledge: SemanticKnowledge;
  behavioralCodex: BehavioralCodex;
  executionPointers: ExecutionPointers;
  geometricAddress: GeometricAddress;
  blockchainInjection: BlockchainInjection;
  cryptography: Cryptography;
  versionHistory: VersionEntry[];
}

export interface CompressionResult {
  originalSize: number;
  compressedSize: number;
  compressionRatio: number;
  strategy: string;
  metadata: Record<string, any>;
}

export interface InjectionResult {
  chain: string;
  txHash: string;
  blockNumber?: number;
  storageLocation: string;
  retrievalPointer: string;
  cost: number;
  timestamp: number;
}

export interface CostAnalysis {
  strategy: string;
  chain: string;
  genomeSize: number;
  cost: number;
  currency: string;
  storage: string;
  retrieval: string;
  permanence: string;
}

export interface ExecutionContext {
  genomeId: string;
  semanticKnowledge: SemanticKnowledge;
  behavioralCodex: BehavioralCodex;
  executionPointers: ExecutionPointers;
  inferenceEngine: any; // Actual inference engine instance
}

export interface QueryResult {
  input: string;
  output: string;
  confidence: number;
  reasoning: string;
  timestamp: number;
  genomeId: string;
  genomeHash: string;
}

export interface ExecutionProof {
  genomeHash: string;
  input: string;
  output: string;
  timestamp: number;
  signature: string;
  verifiable: boolean;
}
