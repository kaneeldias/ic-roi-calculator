import {Button} from "@mantine/core";
import Link from "next/link";

export default function Footer() {
    return (
        <div className={`flex flex-row bg-gradient-to-br from-slate-500 to-slate-600 text-white items-center justify-between w-full p-5 text-xs md:text-sm`}>

            <div className={`mt-1`}>
                Developed by AIESEC International with 🤍
            </div>

            <div className={'flex flex-row space-x-2 items-center justify-center'}>
                <Link href={"https://ic-egypt.aiesec.org.eg/register/"} target={"_blank"}>
                    <Button variant="gradient" gradient={{from: '#e8e690', to: '#c68a04', deg: 160}}
                            styles={{
                                label: {color: 'black', fontSize: '0.75rem'},
                            }}
                    >
                        Register for IC
                    </Button>
                </Link>
            </div>

        </div>
    )
}