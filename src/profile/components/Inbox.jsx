// import React from 'react'
// import { App as SendbirdApp } from '@sendbird/uikit-react';
// import '@sendbird/uikit-react/dist/index.css';

// function Inbox() {
//     return (
//         <div>
//             <div style={{ width: '100vw', height: '100vh' }}>
//                 {/* 
//         This super smart component serves as a drop-in chat solution

//         For advanced 🚀 customizations, use SendbirdProvider:
//         https://sendbird.com/docs/chat/uikit/v3/react/essentials/sendbirdprovider
//       */}
//                 <SendbirdApp
//                     appId={import.meta.env.VITE_SENDBIRD_APP_ID}
//                     userId={'wesley'}

//                 />
//             </div>
//         </div>
//     )
// }

// export default Inbox


// import React, { useEffect, useState } from 'react';
// import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
// import '@sendbird/uikit-react/dist/index.css';
// import { useUser } from '@clerk/clerk-react';
// import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
// import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

// function Inbox() {

//     const [userId, setUserId] = useState()
//     const [channelUrl, setChannelUrl] = useState()

//     const { user } = useUser()

//     useEffect(() => {
//         if (user) {
//             const id = (user.primaryEmailAddress?.emailAddress).split('@')[0];
//             setUserId(userId)
//         }
//     }, [user])


//     return (
//         <div style={{ height: '100vh', overflow: 'auto' }}>
//             <SendBirdProvider appId={import.meta.env.VITE_SENDBIRD_APP_ID}
//                 userId={userId}
//                 nickname={user?.fullName}
//                 profileUrl={user?.imageUrl}
//                 allowProfileEdit={true}
//             >

//                 <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
//                     {/* Channel List */}
//                     <div><GroupChannelList
//                         onChannelSelect={(channel) => {
//                             setChannelUrl(channel?.url)
//                         }}
//                         channelListQueryParams={
//                             { includeEmpty: true }
//                         }
//                     /></div>

//                     {/* Channel Message Area */}
//                     <div className='md:col-span-2'>
//                         <GroupChannel channelUrl={channelUrl} />
//                     </div>
//                 </div>



//             </SendBirdProvider>

//         </div>
//     );
// }

// export default Inbox;


// import React, { useEffect, useState } from 'react';
// import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
// import '@sendbird/uikit-react/dist/index.css';
// import { useUser } from '@clerk/clerk-react';
// import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
// import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';

// function Inbox() {
//     const [userId, setUserId] = useState(null);
//     const [channelUrl, setChannelUrl] = useState('');

//     const { user, isLoaded } = useUser();

//     useEffect(() => {
//         if (isLoaded && user) {
//             const id = user.primaryEmailAddress?.emailAddress.split('@')[0];
//             setUserId(id); // Fixed: was setting userId instead of id
//         }
//     }, [user, isLoaded]); // Added isLoaded to dependencies

//     // Don't render until we have user data
//     if (!isLoaded || !userId) {
//         return (
//             <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                 <div>Loading...</div>
//             </div>
//         );
//     }

//     return (
//         <div style={{ height: '100vh', overflow: 'auto' }}>
//             <SendBirdProvider
//                 appId={import.meta.env.VITE_SENDBIRD_APP_ID}
//                 userId={userId}
//                 nickname={user?.fullName || userId}
//                 profileUrl={user?.imageUrl || ''}
//                 allowProfileEdit={false} // Set to false to prevent the profile edit dialog
//             >
//                 <div className='grid grid-cols-1 md:grid-cols-3 h-full'>
//                     {/* Channel List */}
//                     <div className="border p-5 shadow-lg border-indigo-600 rounded-lg">
//                         <GroupChannelList
//                             onChannelSelect={(channel) => {
//                                 setChannelUrl(channel?.url || '');
//                             }}
//                             channelListQueryParams={{
//                                 includeEmpty: true
//                             }}
//                         />
//                     </div>

//                     {/* Channel Message Area */}
//                     <div className='md:col-span-2'>
//                         {channelUrl ? (
//                             <GroupChannel channelUrl={channelUrl} />
//                         ) : (
//                             <div className="flex items-center justify-center h-full text-gray-500">
//                                 Select a channel to start messaging
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </SendBirdProvider>
//         </div>
//     );
// }

// export default Inbox;



import React, { useEffect, useState } from 'react';
import { App as SendbirdApp, SendBirdProvider } from '@sendbird/uikit-react';
import '@sendbird/uikit-react/dist/index.css';
import { useUser } from '@clerk/clerk-react';
import { GroupChannelList } from '@sendbird/uikit-react/GroupChannelList';
import { GroupChannel } from '@sendbird/uikit-react/GroupChannel';
import { motion, AnimatePresence } from 'framer-motion';

function Inbox() {
    const [userId, setUserId] = useState(null);
    const [channelUrl, setChannelUrl] = useState('');

    const { user, isLoaded } = useUser();

    useEffect(() => {
        if (isLoaded && user) {
            const id = user.primaryEmailAddress?.emailAddress.split('@')[0];
            setUserId(id);
        }
    }, [user, isLoaded]);

    // Loading animation variants
    const loadingVariants = {
        initial: { opacity: 0, scale: 0.8 },
        animate: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Container animation variants
    const containerVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.2
            }
        }
    };

    // Channel list animation variants
    const channelListVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    // Channel content animation variants
    const channelContentVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            x: 50,
            transition: {
                duration: 0.3
            }
        }
    };

    // Placeholder animation variants
    const placeholderVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    // Floating animation for decorative elements
    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Don't render until we have user data
    if (!isLoaded || !userId) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 flex items-center justify-center relative overflow-hidden">
                {/* Animated background elements */}
                <motion.div
                    className="absolute top-20 left-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl"
                    variants={floatingVariants}
                    animate="animate"
                />
                <motion.div
                    className="absolute bottom-20 right-20 w-40 h-40 bg-indigo-500/20 rounded-full blur-xl"
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: '2s' }}
                />

                <motion.div
                    className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
                    variants={loadingVariants}
                    initial="initial"
                    animate="animate"
                >
                    <div className="flex items-center space-x-3">
                        <motion.div
                            className="w-6 h-6 bg-purple-400 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                        />
                        <motion.div
                            className="w-6 h-6 bg-indigo-400 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.3
                            }}
                        />
                        <motion.div
                            className="w-6 h-6 bg-purple-300 rounded-full"
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [1, 0.7, 1]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut",
                                delay: 0.6
                            }}
                        />
                    </div>
                    <motion.p
                        className="text-white mt-4 text-lg font-medium"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        Loading your messages...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
            {/* Animated background elements */}
            <motion.div
                className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
            />
            <motion.div
                className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '2s' }}
            />
            <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-purple-400/5 rounded-full blur-2xl"
                variants={floatingVariants}
                animate="animate"
                style={{ animationDelay: '4s' }}
            />

            <SendBirdProvider
                appId={import.meta.env.VITE_SENDBIRD_APP_ID}
                userId={userId}
                nickname={user?.fullName || userId}
                profileUrl={user?.imageUrl || ''}
                allowProfileEdit={false}
            >
                <motion.div
                    className="h-screen p-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="grid grid-cols-1 md:grid-cols-3 h-full gap-6">
                        {/* Channel List */}
                        <motion.div
                            className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 overflow-hidden"
                            variants={channelListVariants}
                            whileHover={{
                                scale: 1.02,
                                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 p-4 border-b border-white/10">
                                <h2 className="text-white text-lg font-semibold">Channels</h2>
                            </div>
                            <div className="p-4 h-full">
                                <GroupChannelList
                                    onChannelSelect={(channel) => {
                                        setChannelUrl(channel?.url || '');
                                    }}
                                    channelListQueryParams={{
                                        includeEmpty: true
                                    }}
                                />
                            </div>
                        </motion.div>

                        {/* Channel Message Area */}
                        <motion.div
                            className="md:col-span-2"
                            variants={channelContentVariants}
                        >
                            <AnimatePresence mode="wait">
                                {channelUrl ? (
                                    <motion.div
                                        key="channel-content"
                                        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-full overflow-hidden"
                                        variants={channelContentVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                        whileHover={{
                                            scale: 1.01,
                                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                                        }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                    >
                                        <GroupChannel channelUrl={channelUrl} />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="placeholder"
                                        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 h-full flex items-center justify-center relative overflow-hidden"
                                        variants={placeholderVariants}
                                        initial="hidden"
                                        animate="visible"
                                        exit="exit"
                                    >
                                        {/* Placeholder decorative elements */}
                                        <motion.div
                                            className="absolute top-1/4 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl"
                                            animate={{
                                                scale: [1, 1.3, 1],
                                                opacity: [0.3, 0.6, 0.3]
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        />
                                        <motion.div
                                            className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-indigo-400/20 rounded-full blur-xl"
                                            animate={{
                                                scale: [1, 1.2, 1],
                                                opacity: [0.3, 0.5, 0.3]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut",
                                                delay: 1
                                            }}
                                        />

                                        <motion.div
                                            className="text-center z-10"
                                            whileHover={{ scale: 1.05 }}
                                        >
                                            <motion.div
                                                className="w-20 h-20 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full mx-auto mb-4 flex items-center justify-center"
                                                animate={{
                                                    rotate: [0, 360],
                                                    scale: [1, 1.1, 1]
                                                }}
                                                transition={{
                                                    rotate: {
                                                        duration: 8,
                                                        repeat: Infinity,
                                                        ease: "linear"
                                                    },
                                                    scale: {
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        ease: "easeInOut"
                                                    }
                                                }}
                                            >
                                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                                                </svg>
                                            </motion.div>
                                            <motion.p
                                                className="text-white/80 text-xl font-medium"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                            >
                                                Select a channel to start messaging
                                            </motion.p>
                                            <motion.p
                                                className="text-white/60 text-sm mt-2"
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                Choose from your channels on the left
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>
                </motion.div>
            </SendBirdProvider>

            {/* Custom styles for Sendbird components */}
            <style jsx global>{`
                .sendbird-app {
                    background: transparent !important;
                }
                
                .sendbird-channel-list {
                    background: transparent !important;
                    color: white !important;
                }
                
                .sendbird-channel-list__item {
                    background: rgba(255, 255, 255, 0.05) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 12px !important;
                    margin-bottom: 8px !important;
                    transition: all 0.3s ease !important;
                }
                
                .sendbird-channel-list__item:hover {
                    background: rgba(147, 51, 234, 0.2) !important;
                    border-color: rgba(147, 51, 234, 0.3) !important;
                    transform: translateY(-2px) !important;
                }
                
                .sendbird-channel-list__item--active {
                    background: rgba(147, 51, 234, 0.3) !important;
                    border-color: rgba(147, 51, 234, 0.5) !important;
                }
                
                .sendbird-channel-list__item-content {
                    color: white !important;
                }
                
                .sendbird-channel-list__item-content .sendbird-channel-list__item-content__title {
                    color: white !important;
                }
                
                .sendbird-channel-list__item-content .sendbird-channel-list__item-content__subtitle {
                    color: rgba(255, 255, 255, 0.7) !important;
                }
                
                .sendbird-conversation {
                    background: transparent !important;
                }
                
                .sendbird-conversation__messages {
                    background: transparent !important;
                }
                
                .sendbird-conversation__messages-padding {
                    background: transparent !important;
                }
                
                .sendbird-message-input {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.2) !important;
                    border-radius: 16px !important;
                    backdrop-filter: blur(10px) !important;
                }
                
                .sendbird-message-input__text-field {
                    background: transparent !important;
                    color: white !important;
                    border: none !important;
                }
                
                .sendbird-message-input__text-field::placeholder {
                    color: rgba(255, 255, 255, 0.6) !important;
                }
                
                .sendbird-message-content {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    border-radius: 12px !important;
                    backdrop-filter: blur(10px) !important;
                    color: white !important;
                }
                
                .sendbird-message-content--incoming {
                    background: rgba(147, 51, 234, 0.2) !important;
                    border-color: rgba(147, 51, 234, 0.3) !important;
                }
                
                .sendbird-message-content--outgoing {
                    background: rgba(79, 70, 229, 0.2) !important;
                    border-color: rgba(79, 70, 229, 0.3) !important;
                }
                
                .sendbird-channel-header {
                    background: rgba(255, 255, 255, 0.1) !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
                    backdrop-filter: blur(10px) !important;
                }
                
                .sendbird-channel-header__title {
                    color: white !important;
                }
                
                .sendbird-channel-header__subtitle {
                    color: rgba(255, 255, 255, 0.7) !important;
                }
                
                .sendbird-button {
                    background: rgba(147, 51, 234, 0.3) !important;
                    border: 1px solid rgba(147, 51, 234, 0.5) !important;
                    border-radius: 8px !important;
                    color: white !important;
                    transition: all 0.3s ease !important;
                }
                
                .sendbird-button:hover {
                    background: rgba(147, 51, 234, 0.5) !important;
                    transform: translateY(-1px) !important;
                }
            `}</style>
        </div>
    );
}

export default Inbox;