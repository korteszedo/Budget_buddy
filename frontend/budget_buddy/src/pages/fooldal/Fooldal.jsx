import { useEffect } from "react"
import Navigacio from "../../components/navigacio/Navigacio"
import {
    getBalance,
    getTransactionList,
    getExpensesByCategory,
    getGoals,
} from "../../fetch"


export function Fooldal(){
    useEffect(() => {
        const userId = localStorage.getItem("userId")
        if (!userId) {
            console.log("Nincs userId, nem futnak a fetch-ek.")
            return
        }

        getBalance(userId).then((data) => console.log("balance:", data))
        getTransactionList(userId).then((data) => console.log("list:", data))
        getExpensesByCategory(userId).then((data) =>
            console.log("expenses-by-category:", data)
        )
        getGoals(userId).then((data) => console.log("goals:", data))
    }, [])

    return(
        <div>
            <Navigacio/>
            <h1>dasdsd</h1>
        </div>
    )
}
