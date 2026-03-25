import type { CostAnalysis } from "../types/genome";

/**
 * Cost Calculator for Agent Genome Injection
 * Analyzes costs across different blockchain strategies
 */

export class CostCalculator {
  private chainPricing: Record<string, { costPerMB: number; speed: string; permanence: string }> = {
    arweave: {
      costPerMB: 0.01,
      speed: "1-2 seconds",
      permanence: "Forever",
    },
    ethereum: {
      costPerMB: 0.039,
      speed: "1-2 seconds",
      permanence: "Forever",
    },
    polygon: {
      costPerMB: 0.0014,
      speed: "2-3 seconds",
      permanence: "Forever",
    },
    solana: {
      costPerMB: 0.00004,
      speed: "400ms",
      permanence: "Forever",
    },
    optimism: {
      costPerMB: 0.01,
      speed: "2-5 seconds",
      permanence: "Forever",
    },
    arbitrum: {
      costPerMB: 0.008,
      speed: "2-5 seconds",
      permanence: "Forever",
    },
    base: {
      costPerMB: 0.008,
      speed: "2-5 seconds",
      permanence: "Forever",
    },
  };

  /**
   * Calculate cost for single chain
   */
  calculateSingleChain(genomeSize: number, chain: string): CostAnalysis {
    const pricing = this.chainPricing[chain];
    if (!pricing) {
      throw new Error(`Chain not supported: ${chain}`);
    }

    const cost = genomeSize * pricing.costPerMB;

    return {
      strategy: "single-chain",
      chain,
      genomeSize,
      cost: Math.round(cost * 100000) / 100000, // Round to 5 decimals
      currency: "USD",
      storage: chain,
      retrieval: pricing.speed,
      permanence: pricing.permanence,
    };
  }

  /**
   * Calculate cost for all chains
   */
  calculateAllChains(genomeSize: number): CostAnalysis[] {
    return Object.keys(this.chainPricing).map((chain) =>
      this.calculateSingleChain(genomeSize, chain)
    );
  }

  /**
   * Find cheapest chain
   */
  findCheapestChain(genomeSize: number): CostAnalysis {
    const allChains = this.calculateAllChains(genomeSize);
    return allChains.reduce((min, current) =>
      current.cost < min.cost ? current : min
    );
  }

  /**
   * Calculate hybrid strategy cost
   * Semantic knowledge on Arweave, behavioral on Solana, pointers on Ethereum
   */
  calculateHybridStrategy(
    semanticSize: number,
    behavioralSize: number,
    pointersSize: number,
    addressSize: number
  ): {
    breakdown: CostAnalysis[];
    total: number;
    strategy: string;
  } {
    const semantic = this.calculateSingleChain(semanticSize, "arweave");
    const behavioral = this.calculateSingleChain(behavioralSize, "solana");
    const pointers = this.calculateSingleChain(pointersSize, "ethereum");
    const address = this.calculateSingleChain(addressSize, "polygon");

    const total =
      semantic.cost + behavioral.cost + pointers.cost + address.cost;

    return {
      breakdown: [
        { ...semantic, strategy: "semantic-knowledge" },
        { ...behavioral, strategy: "behavioral-codex" },
        { ...pointers, strategy: "execution-pointers" },
        { ...address, strategy: "geometric-address" },
      ],
      total: Math.round(total * 100000) / 100000,
      strategy: "hybrid",
    };
  }

  /**
   * Calculate cost for multiple agents
   */
  calculateBatchCost(
    agentCount: number,
    genomeSize: number,
    chain: string,
    batchDiscount: number = 0.1 // 10% discount for batches
  ): {
    perAgent: number;
    total: number;
    discount: number;
  } {
    const singleCost = this.calculateSingleChain(genomeSize, chain).cost;
    const perAgent = singleCost * (1 - batchDiscount);
    const total = perAgent * agentCount;
    const discount = singleCost * agentCount - total;

    return {
      perAgent: Math.round(perAgent * 100000) / 100000,
      total: Math.round(total * 100000) / 100000,
      discount: Math.round(discount * 100000) / 100000,
    };
  }

  /**
   * Calculate annual cost for network
   */
  calculateAnnualNetworkCost(
    agentCount: number,
    genomeSize: number,
    updateFrequency: number = 12 // updates per year
  ): {
    perAgent: number;
    total: number;
    perUpdate: number;
  } {
    const cheapest = this.findCheapestChain(genomeSize);
    const perUpdate = cheapest.cost;
    const perAgent = perUpdate * updateFrequency;
    const total = perAgent * agentCount;

    return {
      perAgent: Math.round(perAgent * 100000) / 100000,
      total: Math.round(total * 100000) / 100000,
      perUpdate: Math.round(perUpdate * 100000) / 100000,
    };
  }

  /**
   * Compare strategies
   */
  compareStrategies(genomeSize: number): {
    cheapest: CostAnalysis;
    fastest: CostAnalysis;
    mostPermanent: CostAnalysis;
    balanced: CostAnalysis;
    all: CostAnalysis[];
  } {
    const all = this.calculateAllChains(genomeSize);

    return {
      cheapest: all.reduce((min, current) =>
        current.cost < min.cost ? current : min
      ),
      fastest: all.reduce((fastest, current) => {
        const speedValue = this.parseSpeed(current.retrieval);
        const fastestValue = this.parseSpeed(fastest.retrieval);
        return speedValue < fastestValue ? current : fastest;
      }),
      mostPermanent: all[0], // All are permanent, so just return first
      balanced: this.findCheapestChain(genomeSize), // For now, cheapest is balanced
      all,
    };
  }

  /**
   * Calculate ROI for agent deployment
   */
  calculateROI(
    deploymentCost: number,
    revenuePerAgent: number,
    agentCount: number
  ): {
    totalRevenue: number;
    totalCost: number;
    profit: number;
    roi: number;
    breakeven: number;
  } {
    const totalCost = deploymentCost * agentCount;
    const totalRevenue = revenuePerAgent * agentCount;
    const profit = totalRevenue - totalCost;
    const roi = (profit / totalCost) * 100;
    const breakeven = Math.ceil(deploymentCost / revenuePerAgent);

    return {
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      profit: Math.round(profit * 100) / 100,
      roi: Math.round(roi * 100) / 100,
      breakeven,
    };
  }

  /**
   * Parse speed string to milliseconds
   */
  private parseSpeed(speed: string): number {
    if (speed.includes("400ms")) return 400;
    if (speed.includes("1-2s")) return 1500;
    if (speed.includes("2-3s")) return 2500;
    if (speed.includes("2-5s")) return 3500;
    return 5000;
  }

  /**
   * Get all supported chains
   */
  getSupportedChains(): string[] {
    return Object.keys(this.chainPricing);
  }

  /**
   * Update pricing (for dynamic pricing)
   */
  updatePricing(
    chain: string,
    costPerMB: number,
    speed: string,
    permanence: string
  ): void {
    this.chainPricing[chain] = { costPerMB, speed, permanence };
  }
}

export default CostCalculator;
