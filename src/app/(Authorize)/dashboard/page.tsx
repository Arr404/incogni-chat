'use client'
import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    IconButton,
    InputBase,
    Paper,
    Badge,
    Tooltip,
    styled, Button
} from '@mui/material';

import {
    Person as PersonIcon,
    Message as MessageIcon,
    AddComment as AddCommentIcon,
    Settings as SettingsIcon,
    Search as SearchIcon,
    MoreVert as MoreVertIcon,
    AttachFile as AttachFileIcon,
    SendRounded as SendRoundedIcon,
    EmojiEmotionsOutlined as EmojiIcon,
} from '@mui/icons-material';
import {useRouter} from "next/navigation";

interface chat {
    id: number;
    name: string;
    message: string;
    time: string;
    unread: number;
    online: boolean;
}

// Custom styled components
const NavButton = styled(ListItemButton)(() => ({
    borderRadius: 8,
    marginBottom: 4,
    '&:hover': {
        backgroundColor: 'rgba(0, 173, 181, 0.08)',
    },
}));

const ChatLayout = () => {
    const [selectedChat, setSelectedChat] = useState<chat | null>(null);
    const [active, setActive] = useState<string>("Messages");
    const router = useRouter();

    const chats = [
        {
            id: 1,
            name: "John Doe",
            message: "Hey, how are you?",
            time: "10:30 AM",
            unread: 2,
            online: true,
        },
        {
            id: 2,
            name: "Jane Smith",
            message: "Can we meet tomorrow?",
            time: "9:45 AM",
            unread: 0,
            online: false,
        },
        {
            id: 3,
            name: "Mike Johnson",
            message: "The project is ready for review",
            time: "Yesterday",
            unread: 1,
            online: true,
        },
    ];

    return (
        <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'grey.100' }}>
            {/* First Column - Navigation */}
            <Box sx={{
                width: 100,
                bgcolor: 'white',
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 3, bgcolor: '#00ADB5', color: 'white' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 0 }} onClick={ () => setSelectedChat(null)}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 45, height: 45 }}>
                            <PersonIcon />
                        </Avatar>
                       {/* <Box>
                            <Typography variant="subtitle1" fontWeight="bold">Your Name</Typography>
                            <Typography variant="caption" sx={{ opacity: 0.8 }}>Online</Typography>
                        </Box>*/}
                    </Box>
                </Box>

                <List sx={{ px: 2, py: 4 }}>
                    {['Messages', 'Settings'].map((text, index) => (
                        <NavButton key={text} sx={{
                            display: 'flex',
                            alignItems: 'center',
                            position: 'relative',
                            '&.active::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: 4,
                                bgcolor: '#00ADB5',
                            }
                        }} className={active === text ? 'active' : ''}>
                            {index === 0 && <MessageIcon sx={{ color: '#00ADB5', mr: 2 }} />}

                            {index === 1 && <SettingsIcon sx={{ color: '#00ADB5', mr: 2 }} />}
                           {/* <ListItemText primary={text} />*/}
                        </NavButton>
                    ))}
                </List>

            </Box>

            {/* Second Column - Chat List */}
            <Box sx={{
                width: 340,
                bgcolor: 'white',
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ p: 2 }}>
                    <Typography variant="h6" sx={{ color: '#00ADB5', mb: 2 }}>Messages</Typography>
                    <Paper
                        elevation={0}
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            bgcolor: 'grey.100',
                            mb: 2
                        }}
                    >
                        <IconButton sx={{ p: '10px' }}>
                            <SearchIcon />
                        </IconButton>
                        <InputBase
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search messages"
                        />
                    </Paper>
                </Box>

                <List sx={{ flex: 1, overflow: 'auto' }}>
                    {chats.map((chat) => (
                        <ListItem
                            key={chat.id}
                            disablePadding
                            secondaryAction={
                                chat.unread > 0 && (
                                    <Badge
                                        badgeContent={chat.unread}
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                bgcolor: '#FC5185',
                                                color: 'white'
                                            }
                                        }}
                                    />
                                )
                            }
                        >
                            <ListItemButton
                                selected={selectedChat?.id === chat.id}
                                onClick={() => setSelectedChat(chat)}
                                sx={{
                                    '&.Mui-selected': {
                                        bgcolor: 'rgba(0, 173, 181, 0.08)',
                                        borderLeft: 3,
                                        borderColor: '#00ADB5',
                                    }
                                }}
                            >
                                <ListItemAvatar>
                                    <Badge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        sx={{
                                            '& .MuiBadge-badge': {
                                                bgcolor: chat.online ? '#44b700' : 'grey.500',
                                            }
                                        }}
                                    >
                                        <Avatar sx={{ bgcolor: 'rgba(0, 173, 181, 0.1)' }}>
                                            <PersonIcon sx={{ color: '#00ADB5' }} />
                                        </Avatar>
                                    </Badge>
                                </ListItemAvatar>
                                <ListItemText
                                    slotProps={{ primary: { style: { color: '#2c3031' } } }}
                                    primary={chat.name}
                                    secondary={chat.message}
                                    secondaryTypographyProps={{ noWrap: true }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ ml: 2 }}>
                                    {chat.time}
                                </Typography>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            {/* Third Column - Chat Detail */}
            <Box sx={{
                flex: 1,
                bgcolor: 'white',
                boxShadow: 1,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {selectedChat ? (
                    <>
                        <Box sx={{
                            p: 2,
                            borderBottom: 1,
                            borderColor: 'divider',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Badge
                                    overlap="circular"
                                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    variant="dot"
                                    sx={{
                                        '& .MuiBadge-badge': {
                                            bgcolor: selectedChat.online ? '#44b700' : 'grey.500',
                                        }
                                    }}
                                >
                                    <Avatar sx={{ bgcolor: 'rgba(0, 173, 181, 0.1)' }}>
                                        <PersonIcon sx={{ color: '#00ADB5' }} />
                                    </Avatar>
                                </Badge>
                                <Box>
                                    <Typography variant="subtitle1" fontWeight="bold" color={"#2c3737"}>
                                        {selectedChat.name}
                                    </Typography>
                                    <Typography variant="caption" color="success.main">
                                        {selectedChat.online ? 'Online' : 'Offline'}
                                    </Typography>
                                </Box>
                            </Box>
                            <Box>
                                <Tooltip title="Call">
                                    <IconButton sx={{ color: '#00ADB5' }}>

                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Video Call">
                                    <IconButton sx={{ color: '#00ADB5' }}>

                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                    <IconButton>
                                        <MoreVertIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>

                        <Box sx={{ flex: 1, bgcolor: 'grey.50', p: 3, overflow: 'auto' }}>
                            <Paper
                                elevation={1}
                                sx={{
                                    p: 2,
                                    maxWidth: '80%',
                                    bgcolor: 'rgba(0, 173, 181, 0.08)',
                                    borderRadius: 3
                                }}
                            >
                                <Typography>{selectedChat.message}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                                    {selectedChat.time}
                                </Typography>
                            </Paper>
                        </Box>

                        <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                            <Paper
                                elevation={0}
                                sx={{
                                    p: '2px 4px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    bgcolor: 'grey.100',
                                    borderRadius: 3
                                }}
                            >
                                <IconButton size="small">
                                    <EmojiIcon />
                                </IconButton>
                                <IconButton size="small">
                                    <AttachFileIcon />
                                </IconButton>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Type a message..."
                                />
                                <IconButton sx={{ color: '#00ADB5' }}>
                                    <SendRoundedIcon />
                                </IconButton>
                            </Paper>
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.secondary',
                            p: 2
                        }}
                    >
                        <Button
                            onClick={() => router.push('/dashboard/add')}
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                bgcolor: 'rgba(0, 173, 181, 0.1)',
                                color: '#00ADB5',
                                borderRadius: '12px',
                                p: 2,
                                transition: '0.2s',
                                '&:hover': {
                                    bgcolor: '#00ADB5',
                                    color: '#FFFFFF'
                                }
                            }}
                        >
                            <Avatar
                                sx={{
                                    width: 64,
                                    height: 64,
                                    bgcolor: 'transparent',
                                    mb: 1
                                }}
                            >
                                <AddCommentIcon sx={{ fontSize: 40 }} />
                            </Avatar>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                New Chat
                            </Typography>
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ChatLayout;