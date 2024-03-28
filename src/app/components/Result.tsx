"use client"

import CalculationRow from "@/app/components/CalculationRow";

const DELEGATE_FEE = 606;

interface Props {
    entity: string;
    ticketCost: number;
    numDelegates: number;
    revenuePerApproval: number;
}
export default function Result(props: Props) {
    const {entity, ticketCost, numDelegates, revenuePerApproval} = props;
    const numApprovals = (DELEGATE_FEE + ticketCost) * numDelegates / revenuePerApproval;

    return (
        <div className={`flex flex-col h-full bg-black bg-opacity-5 rounded-md p-5 border-dashed border-2 border-gray-800 border-opacity-25 justify-center text-sm md:text-lg`}>
            <div>
                You need to do
            </div>
            <div className={`flex flex-row font-bold space-x-3 items-center`}>
                <div className={`text-6xl md:text-8xl`}>{Math.ceil(numApprovals)}</div>
                <div className={`text-2xl md:text-4xl`}>approvals</div>
            </div>

            <div>
                to break even
            </div>

            <div className={`flex flex-col mt-10 text-xs md:text-sm`}>
                <CalculationRow description={`Approximate ticket cost from ${entity} to Egypt`}
                                value={`$${ticketCost}`}/>
                <CalculationRow description={`Delegate fee for IC 2024`} value={`$${DELEGATE_FEE}`}/>

                <div className={`border-b-2 border-gray-800 border-opacity-15 my-1`}/>

                <CalculationRow description={`Total cost per delegate`} value={`$${ticketCost + DELEGATE_FEE}`}/>

                <div className={`h-3`}></div>

                <CalculationRow description={`Number of delegates`} value={numDelegates}/>

                <div className={`h-3`}></div>

                <CalculationRow
                    description={`Total cost for all delegates ($${ticketCost + DELEGATE_FEE} x ${numDelegates})`}
                    value={`$${numDelegates * (ticketCost + DELEGATE_FEE)}`}/>

                <div className={`h-3`}></div>

                <CalculationRow
                    description={`Revenue per approval`}
                    value={`$${revenuePerApproval}`}/>

                <div className={`h-3`}></div>

                <CalculationRow
                    description={`Total number of Approvals ($${(ticketCost + DELEGATE_FEE) * numDelegates} ÷ $${revenuePerApproval})`}
                    value={`${numApprovals.toFixed(2)}`}/>

            </div>

        </div>
    )
}
