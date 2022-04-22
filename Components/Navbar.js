import Link from "next/link";
import styles from "../styles/Navbar.module.css";
import Web3 from 'web3';
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

const Navbar = () => {
    const [web3, setWeb3] = useState(undefined);
    const [currAccount, setcurrAccount] = useState(undefined);
    const [isConnected, setIsConnected] = useState(false);

    const checkWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                const newWeb3 = new Web3(window.ethereum);
                setWeb3(newWeb3);
                const currAcc = await newWeb3.eth.getAccounts();

                if (currAcc.length === 0) {
                    setcurrAccount(undefined);
                    setIsConnected(false);
                } else {
                    setcurrAccount(currAcc[0]);
                    setIsConnected(true);
                }
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Please Install MetaMask!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => { checkWallet() }, []);

    const connectWallet = async () => {
        if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
            try {
                await window.ethereum.request({ method: "eth_requestAccounts" });
                // const newWeb3 = new Web3(window.ethereum);
                // setWeb3(newWeb3);
                const accounts = await web3.eth.getAccounts();
                setcurrAccount(accounts[0]);
                
                toast.success('Connected To Web', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsConnected(true)
            } catch (error) {
                toast.error(error.message, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        } else {
            toast.error('Please Install MetaMask!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    return (
        <nav className={styles.nav}>
            <ToastContainer />
            <div className={styles.nav__wrapper}>
                <div className={styles.brand}>
                    <Link href="/">Web3.0</Link>
                </div>

                <div className={styles.mid__nav}>
                    <Link href="/">About</Link>
                    <Link href="/">Contact</Link>
                    <Link href="/">Blog</Link>
                </div>

                {!isConnected ? 
                    <button className={styles.btn} onClick={connectWallet}>Connect Wallet</button>
                :
                    <button className={styles.connected__btn}>Connected</button>
                }
            </div>
        </nav>
    )
}

export default Navbar;