"use client"

import Image from "next/image";
import Form from "@/app/components/Form";
import Result from "@/app/components/Result";
import {useState} from "react";
import IRList from "@/app/components/IRList";

export default function Home() {
    const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
    const [revenuePerApproval, setRevenuePerApproval] = useState<number | null>(null);
    const [numDelegates, setNumDelegates] = useState<number | null>(null);
    const [ticketCost, setTicketCost] = useState<number | null>(null);

    function update(selectedEntity: string, revenuePerApproval: number, numDelegates: number, ticketCost: number) {
        if (selectedEntity === "") {
            setSelectedEntity(null);
            return;
        }

        setSelectedEntity(selectedEntity);
        setRevenuePerApproval(revenuePerApproval);
        setNumDelegates(numDelegates);
        setTicketCost(ticketCost);
    }

    return (
        <div className={`flex flex-col m-3 space-y-10 md:mt-20 w-full md:w-fit scroll-smooth`}>
            <div className={`flex flex-col md:flex-row md:space-x-5 space-y-5 md:space-y-0 w-full md:w-fit`}>
                <div className={`flex flex-col space-y-10 bg-white rounded-md p-5 shadow-md transition-all duration-300 w-full md:w-fit`}>
                    <div className={`flex flex-row items-center space-x-10 w-full justify-center`}>
                        <Image priority className={`w-32 md:w-64`} src={"/logo.webp"} alt={"International Congress 2024 logo"} width={300} height={300}/>
                        <div>
                            <div className={`font-black text-3xl md:text-6xl`}>
                                ROI
                            </div>
                            <div className={`font-bold text-xs md:text-[15.5px]`}>
                                CALCULATOR
                            </div>
                        </div>
                    </div>

                    <Form update={update}/>
                </div>

                { selectedEntity !== null && revenuePerApproval !== null && numDelegates !== null && ticketCost !== null &&
                    <Result entity={selectedEntity} ticketCost={ticketCost} numDelegates={numDelegates} revenuePerApproval={revenuePerApproval}/>
                }

            </div>

            { selectedEntity !== null && revenuePerApproval !== null && numDelegates !== null && ticketCost !== null &&
                <IRList/>
            }
        </div>
    );
}
