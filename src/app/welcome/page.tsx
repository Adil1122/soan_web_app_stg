'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function welcome() {
    const qr_user_name = localStorage.getItem('qr_user_name');
    const router = useRouter();

    useEffect(() => {
        if (localStorage.getItem("qr_user_name") === null) {
            router.push('/qrCode')
          }
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('qr_user_name');
        router.push('/qrCode')

    }
    return (
        <>
        <h1>Logged in User: { qr_user_name } </h1><br></br>
        <button onClick={logoutUser}>Logout</button>
        </>
    )
}