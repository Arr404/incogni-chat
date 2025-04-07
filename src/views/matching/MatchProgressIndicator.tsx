// components/MatchProgressIndicator.tsx
import React from 'react';
import { Paper, Typography, LinearProgress } from '@mui/material';

interface MatchProgressIndicatorProps {
    matches: any[];
}

const MatchProgressIndicator: React.FC<MatchProgressIndicatorProps> = ({ matches }) => {
    const progress = (matches.length / 3) * 100;

    return (
        <Paper
            elevation={3}
            sx={{ mb: 4, backgroundColor: 'background.paper', borderRadius: 2, p: 2 }}
        >
            <Typography variant="body1" color="primary">
                Matches: {matches.length}/3
            </Typography>
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ mt: 1, height: 8, borderRadius: 2 }}
            />
        </Paper>
    );
};

export default MatchProgressIndicator;