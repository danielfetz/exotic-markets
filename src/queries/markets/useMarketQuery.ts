import { useQuery, UseQueryOptions } from 'react-query';
import QUERY_KEYS from 'constants/queryKeys';
import { MarketData } from 'types/markets';
import { BigNumberish } from 'ethers';
import networkConnector from 'utils/networkConnector';
import { bigNumberFormatter } from 'utils/formatters/ethers';
import { MarketStatus } from 'constants/markets';

const useMarketQuery = (marketAddress: string, options?: UseQueryOptions<MarketData>) => {
    return useQuery<MarketData>(
        QUERY_KEYS.Market(marketAddress),
        async () => {
            const { marketDataContract, thalesOracleCouncilContract, marketManagerContract } = networkConnector;
            const [allMarketData, isMarketClosedForDisputes, claimTimeoutDefaultPeriod] = await Promise.all([
                marketDataContract?.getAllMarketData(marketAddress),
                thalesOracleCouncilContract?.isMarketClosedForDisputes(marketAddress),
                marketManagerContract?.claimTimeoutDefaultPeriod(),
            ]);

            const [
                question,
                dataSource,
                ticketType,
                endOfPositioning,
                ticketPrice,
                creationTime,
                isWithdrawalAllowed,
                isDisputed,
                isResolved,
                resolvedTime,
                positions,
                tags,
                poolSize,
                claimablePoolSize,
                poolSizePerPosition,
                canUsersPlacePosition,
                canMarketBeResolved,
                canMarketBeResolvedByPDAO,
                canUsersClaim,
                isCancelled,
                isPaused,
                winningPosition,
                creator,
                resolver,
                fixedBondAmount,
                disputePrice,
                safeBoxLowAmount,
                arbitraryRewardForDisputor,
                backstopTimeout,
                disputeClosedTime,
                canCreatorCancelMarket,
            ] = allMarketData;

            const market: MarketData = {
                address: marketAddress,
                question,
                dataSource,
                isTicketType: ticketType === 0,
                endOfPositioning: Number(endOfPositioning) * 1000,
                ticketPrice: bigNumberFormatter(ticketPrice),
                creationTime: Number(creationTime) * 1000,
                isWithdrawalAllowed,
                isDisputed,
                isResolved,
                resolvedTime: Number(resolvedTime) * 1000,
                positions,
                tags: tags.map((tag: BigNumberish) => Number(tag)),
                poolSize: bigNumberFormatter(poolSize),
                claimablePoolSize: bigNumberFormatter(claimablePoolSize),
                poolSizePerPosition: poolSizePerPosition.map((item: BigNumberish) => bigNumberFormatter(item)),
                isOpen: !isResolved,
                numberOfDisputes: 0,
                numberOfOpenDisputes: 0,
                canUsersPlacePosition,
                canMarketBeResolved,
                canMarketBeResolvedByPDAO,
                canUsersClaim,
                isCancelled,
                isPaused,
                winningPosition: Number(winningPosition),
                creator,
                resolver,
                status: MarketStatus.Open,
                marketClosedForDisputes: isMarketClosedForDisputes,
                isMarketClosedForDisputes,
                backstopTimeout: Number(backstopTimeout) * 1000,
                disputeClosedTime: Number(disputeClosedTime) * 1000,
                claimTimeoutDefaultPeriod: Number(claimTimeoutDefaultPeriod) * 1000,
                disputePrice: bigNumberFormatter(disputePrice),
                canCreatorCancelMarket,
                fixedBondAmount: bigNumberFormatter(fixedBondAmount),
                safeBoxLowAmount: bigNumberFormatter(safeBoxLowAmount),
                arbitraryRewardForDisputor: bigNumberFormatter(arbitraryRewardForDisputor),
            };

            // TODO - needs refactoring
            if (market.isPaused) {
                market.status = MarketStatus.Paused;
            } else {
                if (market.isResolved) {
                    if (market.winningPosition === 0) {
                        if (market.isDisputed) {
                            market.status = MarketStatus.CancelledDisputed;
                        } else {
                            if (market.canUsersClaim) {
                                market.status = MarketStatus.CancelledConfirmed;
                            } else {
                                market.status = MarketStatus.CancelledPendingConfirmation;
                            }
                        }
                    } else {
                        if (market.isDisputed) {
                            market.status = MarketStatus.ResolvedDisputed;
                        } else {
                            if (market.canUsersClaim) {
                                market.status = MarketStatus.ResolvedConfirmed;
                            } else {
                                market.status = MarketStatus.ResolvedPendingConfirmation;
                            }
                        }
                    }
                } else {
                    if (market.canMarketBeResolved) {
                        market.status = MarketStatus.ResolvePending;
                    } else {
                        if (market.isDisputed && Date.now() > market.endOfPositioning) {
                            market.status = MarketStatus.ResolvePendingDisputed;
                        } else {
                            market.status = MarketStatus.Open;
                        }
                    }
                }
            }

            return market;
        },
        {
            refetchInterval: 5000,
            ...options,
        }
    );
};

export default useMarketQuery;
