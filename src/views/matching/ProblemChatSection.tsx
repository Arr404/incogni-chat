// components/ProblemChatSection.tsx
import React from 'react';
import {
    Paper,
    Box,
    Typography,
    TextField,
    IconButton
} from '@mui/material';
import { ChatBubble } from '@mui/icons-material';
import { Send } from 'lucide-react';

interface Chat {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: number;
    online: boolean;
}

interface ProblemChatSectionProps {
    messages: Chat[];
    chatMessage: string;
    onSendMessage: () => void;
    onChatMessageChange: (message: string) => void;
}

const ProblemChatSection: React.FC<ProblemChatSectionProps> = ({
                                                                   messages,
                                                                   chatMessage,
                                                                   onSendMessage,
                                                                   onChatMessageChange
                                                               }) => {
    return (
        <Paper
            elevation={3}
            sx={{
                mt: 4,
                backgroundColor: 'background.paper',
                borderRadius: 2
            }}
        >
            <Box
                sx={{
                    p: 2,
                    borderBottom: 1,
                    borderColor: 'primary.main',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <ChatBubble
                    color="primary"
                    sx={{ mr: 1 }}
                />
                <Typography
                    variant="h6"
                    color="primary"
                >
                    Add your problem brief description
                </Typography>
            </Box>

            {/* Messages Container */}
            <Box
                sx={{
                    height: 300,
                    overflowY: 'auto',
                    p: 2
                }}
            >
                {messages.map(msg => (
                    <Box
                        key={msg.id}
                        sx={{
                            textAlign: msg.name === 'You' ? 'right' : 'left',
                            mb: 1
                        }}
                    >
                        <Typography
                            component="span"
                            sx={{
                                display: 'inline-block',
                                px: 2,
                                py: 1,
                                borderRadius: 2,
                                backgroundColor: msg.name === 'You'
                                    ? 'primary.main'
                                    : 'background.default',
                                color: 'white'
                            }}
                        >
                            {msg.message}
                        </Typography>
                    </Box>
                ))}
            </Box>

            {/* Message Input */}
            <Box
                sx={{
                    p: 2,
                    borderTop: 1,
                    borderColor: 'primary.main',
                    display: 'flex'
                }}
            >
                <TextField
                    fullWidth
                    variant="outlined"
                    value={chatMessage}
                    onChange={(e) => onChatMessageChange(e.target.value)}
                    placeholder="Write something while you wait..."
                    sx={{
                        mr: 1,
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'background.default',
                            color: 'white'
                        }
                    }}
                />
                <IconButton
                    color="primary"
                    onClick={onSendMessage}
                    sx={{
                        width: '3rem',
                        height: '3rem',
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark'
                        }
                    }}
                >
                    <Send className='text-white' />
                </IconButton>
            </Box>
        </Paper>
    );
};

export default ProblemChatSection;