"use client"

import {Button, Input, NumberInput, Select} from "@mantine/core";
import {useEffect, useState} from "react";

interface Props {
    update: (selectedEntity: string, revenuePerApproval: number, numDelegates: number, ticketCost: number) => void;
}

export default function Form(props: Props) {
    const [ticketPrices, setTicketPrices] = useState<{
        entity: string,
        price: number
    }[]>([]);
    useEffect(() => {
        // read csv
        fetch('https://docs.google.com/spreadsheets/d/e/2PACX-1vSLCAyPoCN6FSGSYn-GD1M0yTxnn6P1aK2MWRmY2yuC6SjvdSETonAO-b6FQN8mkddP-N0aYH4mDMH1/pub?gid=0&single=true&output=csv').then(async (response) => {
            const text = await response.text();
            const data = parseCsv(text);

            const ticketPrices: {
                entity: string,
                price: number
            }[] = [];
            for (const row of data) {
                // @ts-ignore
                if (!row['entity'] || !row['price']) {
                    // @ts-ignore
                    console.warn('Skipping row', row);
                    continue;
                }

                // @ts-ignore
                if (ticketPrices.find(({entity}) => entity === row['entity'])) {
                    // @ts-ignore
                    ticketPrices.find(({entity}) => entity === row['entity']).price = parseCost(row['price']);
                    continue;
                }

                // @ts-ignore
                const entity = row['entity']!;
                // @ts-ignore
                const price = parseCost(row['price']);
                ticketPrices.push({
                    entity,
                    price
                });
            }

            setTicketPrices(ticketPrices);
        });
    }, []);

    const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
    const [revenuePerApproval, setRevenuePerApproval] = useState<number | null>(null);
    const [numDelegates, setNumDelegates] = useState<number | null>(null);

    function submitForm() {
        const price = ticketPrices.find(({entity}) => entity === selectedEntity)?.price;
        props.update(selectedEntity!, revenuePerApproval!, numDelegates!, price!);
    }

    useEffect(() => {
        props.update("", 0, 0, 0);
    }, [selectedEntity, revenuePerApproval, numDelegates]);


    return (
        <div className={`flex flex-col space-y-5`}>
            <Select
                label="Your Entdity"
                data={ticketPrices.map(({entity}) => entity).sort()}
                onChange={(value) => setSelectedEntity(value)}
                searchable
                comboboxProps={{ transitionProps: { transition: 'fade-down', duration: 200 } }}
                styles={{
                    option: {color: 'black'},
                }}
            />

            <Input.Wrapper label="Revenue per approval (USD)" description="Approximately how much do you make per approval?">
                <NumberInput placeholder={"0 USD"} suffix=" USD" min={0} hideControls onChange={(value) => setRevenuePerApproval(parseFloat(value.toString()))}/>
            </Input.Wrapper>

            <Input.Wrapper label="# of delegates" description="How many delegates from your entity will attend IC 2024?">
                <NumberInput placeholder="0 delegates" suffix=" delegates" min={0} hideControls onChange={(value) => setNumDelegates(parseInt(value.toString()))}/>
            </Input.Wrapper>

            <Button variant="gradient" gradient={{ from: '#3264cc', to: '#0d1c66', deg: 160}} fullWidth onClick={submitForm}>Calculate ROI</Button>
        </div>
    );
}

function parseCsv(csvString: string, delimiter = ',', quoteChar = '"') {
    const lines = csvString.split('\n');
    const headers = parseLine(lines[0], delimiter, quoteChar);

    return lines.slice(1).map(line => {
        const values = parseLine(line, delimiter, quoteChar);
        return headers.reduce((accumulator, header, index) => {
            // @ts-ignore
            accumulator[header] = values[index];
            return accumulator;
        }, {});
    });
}

function parseLine(line: string, delimiter: string, quoteChar: string) {
    const values = [];
    let value = '';
    let insideQuote = false;

    for (let char of line) {
        if (char === quoteChar) {
            insideQuote = !insideQuote;
        } else if (char === delimiter && !insideQuote) {
            values.push(value);
            value = '';
        } else {
            value += char;
        }
    }

    values.push(value.trim());
    return values;
}

function parseCost(cost: string) {
    return parseFloat(cost.replace(/[^0-9.]/g, ''));
}
