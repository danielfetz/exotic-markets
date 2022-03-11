export type DisputeInfo = {
    id: string;
    timestamp: number;
    creationDate: number;
    market: string;
    disputor: string;
    reasonForDispute: string;
    status: string;
};

export type Disputes = DisputeInfo[];

export type MarketInfo = {
    address: string;
    question: string;
    dataSource: string;
    endOfPositioning: number;
    ticketPrice: number;
    isWithdrawalAllowed: boolean;
    positions: string[];
    tags: number[];
    isOpen: boolean;
    isClaimAvailable: boolean;
    // numberOfOpenedDisputes: number;
    // hasPosition: boolean;
    // isTicketType: boolean;
    // winningPosition: string | null;
    // disputes?: Disputes;
};

export type MarketDetails = MarketInfo & {
    creationTime: number;
    resolvedTime: number;
    hasOpenDisputes: boolean;
    isResolved: boolean;
    hasPosition: boolean;
    poolSize: number;
    claimablePoolSize: number;
    poolSizePerPosition: number[];
    position: number;
    isTicketType: boolean;
};

export type Markets = MarketInfo[];

export type SortOptionType = {
    id: number;
    title: string;
};

export type MarketsParameters = {
    fixedBondAmount: number;
    maximumPositionsAllowed: number;
    minimumPositioningDuration: number;
    creatorPercentage: number;
    resolverPercentage: number;
    safeBoxPercentage: number;
    withdrawalPercentage: number;
    disputePrice: number;
};

export type TagInfo = {
    id: number;
    label: string;
};

export type Tags = TagInfo[];
