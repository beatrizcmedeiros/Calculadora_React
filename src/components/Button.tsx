import { IButton } from "../interfaces/ButtonInterface";

interface IButtonProps extends IButton{
    onClick:(value:string)=>void;
}

export function Button({color, value, onClick}: IButtonProps){
    return(
        <button onClick={()=>onClick(value)} className= {`border-0 flex justify-center items-center text-2xl font-bold text-slate-900 w-[150px] h-20 rounded-md ${color}`}>
            {value}
        </button>
    )
}