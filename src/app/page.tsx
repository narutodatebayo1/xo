"use client"

import { useEffect, useState } from 'react'
import styles from './page.module.css'

export default function Home() {

    const [arr, SetArr] = useState(["", "", "", "", "", "", "", "", ""])
    const [isX, SetIsX] = useState(true)
    const [winner, SetWinner] = useState(false)

    const clickk = (index: number) => {

        if (winner) return

        if (arr[index] != "") return

        SetArr(prevArr => {
            const newArr = prevArr
            newArr[index] = isX ? "x" : "o"
            return newArr
        })
        SetIsX(!isX)

    }

    useEffect(() => {

        const result = checkWinner()
        if (result != "") {
            // alert(result)
            SetWinner(true)
        }

    }, [isX])

    const checkWinner = () => {

        const ans = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]

        let res = ""

        ans.forEach(pattern => {
            if (arr[pattern[0]] != "" &&
                arr[pattern[0]] == arr[pattern[1]] &&
                arr[pattern[1]] == arr[pattern[2]]
            ) {
                res = arr[pattern[0]]
            }
        });

        return res
    }

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <Box symbol={arr[0]} OnClick={() => clickk(0)} />
                <Box symbol={arr[1]} OnClick={() => clickk(1)} />
                <Box symbol={arr[2]} OnClick={() => clickk(2)} />

                <Box symbol={arr[3]} OnClick={() => clickk(3)} />
                <Box symbol={arr[4]} OnClick={() => clickk(4)} />
                <Box symbol={arr[5]} OnClick={() => clickk(5)} />

                <Box symbol={arr[6]} OnClick={() => clickk(6)} />
                <Box symbol={arr[7]} OnClick={() => clickk(7)} />
                <Box symbol={arr[8]} OnClick={() => clickk(8)} />
            </div>
        </div>
    )
}

interface BoxProps {
    symbol: string,
    OnClick(): void
}

function Box(props: BoxProps) {

    return (
        <div onClick={props.OnClick}>
            {props.symbol == "x" ?
                <div className={styles.cross}>
                    <div></div>
                    <div></div>
                </div>
                :
                <div></div>
            }
            {props.symbol == "o" ?
                <div className={styles.dot}>
                    <div></div>
                    <div></div>
                </div>
                :
                <div></div>
            }
        </div>
    )
}
