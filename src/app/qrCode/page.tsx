'use client';
import React from "react";
import QRCode from "react-qr-code";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";

export default function QRCodeFunction() {
    var qr_code = "" + Date.now() + Math.random(); // "http://en.m.wikipedia.org";
    //var qr_code = "1722411680927.97362";
    const router = useRouter();

    useLayoutEffect(() => {
        function getAlerts() {
            fetch("http://127.0.0.1:5001/soan-web-app-stg/us-central1/helloWorld?qr_code=" + qr_code)
            .then(
                response => response.json(),
                error => {
                    console.log("No! error occured.", error);
                    throw error;
                }
                )
                .then(result => {
                    console.log(result);
    
                    if(result.status === 'success') {
                        console.log('found')
                        localStorage.setItem('qr_user_name', result.data.userData.name);
                        router.push('/welcome')
                    } else {
                        console.log('not found')
                    }
    
                })
                .catch(error => {
                    console.log("Return Error by throwing", error);
                });
          }

          if (localStorage.getItem("qr_user_name") !== null) {
            router.push('/welcome')
          } else {
            getAlerts()
            const interval = setInterval(() => getAlerts(), 5000)
            return () => {
                clearInterval(interval);
            }
          }


      }, []);

    const handleClick = async() => {

        try {

            /*const res = await fetch("http://127.0.0.1:5001/soan-web-app-stg/us-central1/helloWorld?qr_code=" + qrcode, {
                method: "GET",
            })

            if(res.ok) {
                console.log(res)
            } else {
                throw new Error('Problem fetching user data')
            }*/

            /*const res = fetch("http://127.0.0.1:5001/soan-web-app-stg/us-central1/helloWorld?qr_code=" + qr_code)
            .then(
            response => response.json(),
            error => {
                console.log("No! error occured.", error);
                throw error;
            }
            )
            .then(result => {
                console.log(result);

                if(result.status === 'success') {
                    console.log('found')
                } else {
                    console.log('not found')
                }

            })
            .catch(error => {
                console.log("Return Error by throwing", error);
            });

            if(res) {
                console.log(res)
            } else {
                throw new Error('Problem fetching user data')
            }*/
            
        } catch (error) {
            console.log(error)
        }

    };




    return (
        <>
        <div style={{ background: 'white', padding: '16px' }}>
        <QRCode value={qr_code} />

        <br></br>
        {qr_code}
        </div>
        </>
    )
}