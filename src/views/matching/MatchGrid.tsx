// components/MatchGrid.tsx
import React from 'react';
import {
    Grid,
    Card,
    CardContent,
    Typography,
    IconButton
} from '@mui/material';
import { Favorite } from '@mui/icons-material';

interface Match {
    id: number;
    name: string;
    age: number;
    bio: string;
    image: string;
}

interface MatchGridProps {
    matches: Match[];
    onLike: (matchId: number) => void;
}

const MatchGrid: React.FC<MatchGridProps> = ({ matches, onLike }) => {
    if (matches.length === 0) {
        return (
            <Typography
                variant="body1"
                color="text.secondary"
                align="center"
                sx={{ mt: 4 }}
            >
                No matches yet, keep searching...
            </Typography>
        );
    }

    return (
        <Grid container spacing={3}>
            {matches.map(match => (
                <Grid item xs={12} md={6} key={match.id}>
                    <Card
                        sx={{
                            backgroundColor: 'background.paper',
                            position: 'relative',
                            color: 'text.primary'
                        }}
                    >
                        <IconButton
                            color="primary"
                            onClick={() => onLike(match.id)}
                            sx={{
                                position: 'absolute',
                                top: 10,
                                right: 10,
                                backgroundColor: 'primary.main',
                                '&:hover': {
                                    backgroundColor: 'primary.dark'
                                }
                            }}
                        >
                            <Favorite sx={{ color: 'white' }} />
                        </IconButton>
                        <CardContent>
                            <Typography gutterBottom variant="h5" color="primary">
                                {match.name}, {match.age}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {match.bio}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
};

export default MatchGrid;