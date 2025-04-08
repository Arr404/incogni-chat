'use client'
import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Paper,
    List,
    ListItemText,
    CircularProgress,
    ListItemButton, Chip, Button
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import {useRouter} from "next/navigation";

// Problem Categories
const PROBLEM_CATEGORIES = [
    'Technical Project Challenge',
    'Business Strategy Dilemma',
    'Product Development Roadblock',
    'Marketing Campaign Optimization',
    'Startup Scaling Issue',
    'Team Collaboration Problem',
    'Innovation and Creativity Barrier',
    'Operational Efficiency Improvement',
    'Customer Acquisition Strategy',
    'Financial Planning Complexity'
];

const ProblemSearchPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [suggestions, setSuggestions] = useState(PROBLEM_CATEGORIES);
    const router = useRouter();

    // Simulate loading screen
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);





    const handleSearchChange = (e: { target: { value: any; }; }) => {
        const term = e.target.value;
        setSearchTerm(term);
        setSuggestions(
            PROBLEM_CATEGORIES.filter((category) =>
                category.toLowerCase().includes(term.toLowerCase())
            )
        );
    };

    const handleSuggestionSelect = (category: string) => {
        if (!selectedCategories.includes(category)) {
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    const handleCategoryDelete = (categoryToDelete: any) => {
        setSelectedCategories(selectedCategories.filter((cat) => cat !== categoryToDelete));
    };

    if (isLoading) {
        return (
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh',
                        backgroundColor: 'background.default'
                    }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CircularProgress color="primary" size={80} thickness={4} />
                        <Typography
                            variant="h6"
                            color="primary"
                            align="center"
                            sx={{ mt: 2 }}
                        >
                            Finding the perfect problem match...
                        </Typography>
                    </motion.div>
                </Box>
        );
    }

    return (
            <Box
                sx={{
                    overflow: 'hidden',
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 4
                }}
            >
                <Container maxWidth="md">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                        <Typography variant="h4" color="primary" align="center" gutterBottom sx={{ mb: 4 }}>
                            Describe Your Problem
                        </Typography>

                        {/* Selected Categories */}
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                            {selectedCategories.map((category) => (
                                <Chip
                                    key={category}
                                    label={category}
                                    onDelete={() => handleCategoryDelete(category)}
                                    color="primary"
                                />
                            ))}
                        </Box>

                        {/* Search and Suggestions */}
                        <Box sx={{ position: 'relative', mb: 2 }}>
                            <TextField
                                fullWidth
                                variant="outlined"
                                placeholder="What problem are you looking to solve?"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                InputProps={{
                                    startAdornment: (
                                        <Search color="currentColor" style={{ marginRight: 10, opacity: 0.6 }} />
                                    ),
                                    sx: {
                                        backgroundColor: 'background.paper',
                                        color: 'text.primary',
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderColor: 'primary.main'
                                        }
                                    }
                                }}
                            />

                            <AnimatePresence>
                                {suggestions.length > 0 && searchTerm && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        style={{ position: 'absolute', width: '100%', zIndex: 10 }}
                                    >
                                        <Paper elevation={3} sx={{ mt: 1, backgroundColor: 'background.paper' }}>
                                            <List>
                                                {suggestions.map((category, index) => (
                                                    <ListItemButton
                                                        key={index}
                                                        onClick={() => handleSuggestionSelect(category)}
                                                        sx={{ '&:hover': { backgroundColor: 'primary.main', color: 'white' } }}
                                                    >
                                                        <ListItemText
                                                            primary={category}
                                                            primaryTypographyProps={{ color: 'text.primary' }}
                                                        />
                                                    </ListItemButton>
                                                ))}
                                            </List>
                                        </Paper>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </Box>

                        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
                            Select a problem category or describe your unique challenge
                        </Typography>
                        <Button
                            onClick={() => router.push('/matching')}
                            variant="contained"
                            color="primary"
                            sx={{ mt: 4, display: 'block', mx: 'auto' }}
                        >
                            Find Solutions
                        </Button>
                    </motion.div>
                </Container>
            </Box>
    );
};

export default ProblemSearchPage;
