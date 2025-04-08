// Theme Configuration
'use client'
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Container, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import MatchProgressIndicator from '@/views/matching/MatchProgressIndicator';
import MatchGrid from "@/views/matching/MatchGrid";
import ProblemChatSection from "@/views/matching/ProblemChatSection";

// Individual Component Imports

// Types
interface Match {
    id: number;
    name: string;
    age: number;
    bio: string;
    image: string;
}

interface Chat {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: number;
    online: boolean;
}

const MatchingApp: React.FC = () => {
    // Initial State
    const [matches, setMatches] = useState<Match[]>([
        {
            id: 1,
            name: 'Emma',
            age: 28,
            bio: 'Travel enthusiast and coffee lover',
            image: '/api/placeholder/200/200'
        },
        {
            id: 2,
            name: 'Alex',
            age: 32,
            bio: 'Software engineer who loves hiking',
            image: '/api/placeholder/200/200'
        }
    ]);

    const [chatMessage, setChatMessage] = useState('');
    const [messages, setMessages] = useState<Chat[]>([]);

    // Handlers
    const handleLike = (matchId: number) => {
        console.log(`Liked profile ${matchId}`);
    };

    const sendMessage = () => {
        if (chatMessage.trim()) {
            const newMessage: Chat = {
                id: messages.length + 1,
                name: 'You',
                message: chatMessage,
                time: new Date().toLocaleTimeString(),
                unread: 0,
                online: true
            };
            setMessages([...messages, newMessage]);
            setChatMessage('');
        }
    };

    return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <Box
                    sx={{
                        minHeight: '100vh',
                        backgroundColor: 'background.default',
                        color: 'text.primary',
                        py: 4
                    }}
                >
                    <Container maxWidth="lg">
                        <Typography
                            variant="h4"
                            color="primary"
                            gutterBottom
                            sx={{ mb: 4, fontWeight: 'bold' }}
                        >
                            Your Group Problem Match
                        </Typography>

                        <MatchProgressIndicator matches={matches} />

                        <MatchGrid
                            matches={matches}
                            onLike={handleLike}
                        />

                        <ProblemChatSection
                            messages={messages}
                            chatMessage={chatMessage}
                            onSendMessage={sendMessage}
                            onChatMessageChange={setChatMessage}
                        />
                    </Container>
                </Box>
            </motion.div>
    );
};

export default MatchingApp;
