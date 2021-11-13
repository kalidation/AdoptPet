import React, { createContext, useEffect, useCallback } from 'react'
import { View, Text } from 'react-native'
import { useToast } from 'react-native-rooster';


export const ToastContext = createContext()

const ShowToastProvider = ({ children }) => {
    const { addToast, removeToast, setToastConfig } = useToast()

    useEffect(() => {
        setToastConfig({
            bgColor: {
                warning: 'coral',
                info: '#333',
            },
        });
        return () => {
            console.log();
        }
    }, [setToastConfig])

    const handleShowToastOnPress = useCallback(
        (type, message) => {
            addToast({
                type,
                title: type,
                message: message,
            });
        },
        [addToast],
    );


    return (
        <ToastContext.Provider
            value={{
                showToast: (type, message) => {
                    handleShowToastOnPress(type, message)
                }
            }}
        >

            {children}
        </ToastContext.Provider>
    )
}

export default ShowToastProvider
