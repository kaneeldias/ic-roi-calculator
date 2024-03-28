interface Props {
    description: string;
    value: number | string;
}

export default function CalculationRow(props: Props) {
    return (
        <div className={`flex flex-row space-x-5 items-center`}>
            <div className={`w-96`}>
                {props.description}
            </div>

            <div className={'w-16 font-bold text-right'}>
                {props.value}
            </div>
        </div>
    )
}