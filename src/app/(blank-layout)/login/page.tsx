'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, getAuth, signInWithPopup, Auth, AuthError } from 'firebase/auth';
import { Box, Button, Container, Paper, Typography, CircularProgress, Alert, Fade } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import app from '@/services/init';

export default function Login() {
    const router = useRouter();
    const [auth, setAuth] = useState<Auth | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Initialize Firebase auth inside useEffect to ensure it only runs client-side
        const auth = getAuth(app);
        setAuth(auth);
    }, []);

    const handleGoogleLogin = async (): Promise<void> => {
        if (!auth) return;

        setIsLoading(true);
        setError(null);

        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            router.push('/register');
        } catch (error) {
            const authError = error as AuthError;
            console.error('Google Sign-In Error:', authError);
            setError(authError.message || 'Failed to sign in with Google. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
                padding: { xs: 2, sm: 4 },
            }}
        >
            <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center' }}>
                <Paper
                    elevation={8}
                    sx={{
                        width: '100%',
                        padding: { xs: 3, sm: 5 },
                        borderRadius: 2,
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        fontWeight="bold"
                        mb={1}
                        sx={{ color: 'primary.main' }}
                    >
                        Welcome Back
                    </Typography>

                    <Typography variant="body1" color="text.secondary" mb={4}>
                        Sign in to continue to your account
                    </Typography>

                    {error && (
                        <Fade in={!!error}>
                            <Alert
                                severity="error"
                                sx={{ mb: 3 }}
                                onClose={() => setError(null)}
                            >
                                {error}
                            </Alert>
                        </Fade>
                    )}

                    <Button
                        variant="contained"
                        size="large"
                        fullWidth
                        onClick={handleGoogleLogin}
                        disabled={isLoading || !auth}
                        startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <GoogleIcon />}
                        sx={{
                            py: 1.5,
                            textTransform: 'none',
                            fontSize: '1rem',
                            borderRadius: 2,
                            boxShadow: 2,
                        }}
                    >
                        {isLoading ? 'Signing in...' : 'Sign in with Google'}
                    </Button>

                    <Typography variant="body2" color="text.secondary" mt={4}>
                        By continuing, you agree to our Terms of Service and Privacy Policy.
                    </Typography>
                </Paper>
            </Container>
        </Box>
    );
}
