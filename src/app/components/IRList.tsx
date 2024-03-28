"use client"


import {useEffect, useState} from "react";
import {Loader} from "@mantine/core";

export default function IRList() {
    const [irList, setIrList] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        setLoading(true);
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSLCAyPoCN6FSGSYn-GD1M0yTxnn6P1aK2MWRmY2yuC6SjvdSETonAO-b6FQN8mkddP-N0aYH4mDMH1/pub?gid=1000247367&single=true&output=csv').then(async (response) => {
            const text = await response.text();
            const data = text.split("\r\n");
            const reversedIrList = data.reverse();
            const uniqueIrList = Array.from(new Set(reversedIrList));
            setIrList(uniqueIrList);

            setLoading(false);
        });
    }, []);

    return (
        <div className={`flex flex-col border-separate border-t-2 max-w-5xl`}>
            <div className={`font-bold text-lg m-2 text-slate-500`}>
                Don't know who to make these approvals with 🧐? Check the list of the entities that have already registered and get your IR game ready 🔥🔥🔥🔥</div>

            {loading &&
                <div className={`ml-2`}>
                    <Loader color="indigo" type="dots" />
                </div>
            }


                <div className={`flex flex-wrap items-stretch justify-stretch`}>
                {irList.map((ir, index) => {
                    return (
                        <div key={index} className={`bg-gray-200 p-2 rounded-md m-2 hover:bg-blue-900 hover:text-white cursor-default duration-300`}>
                            {ir}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
