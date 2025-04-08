'use client'
import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    Container,
    Paper,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    SelectChangeEvent
} from '@mui/material';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { DateTime } from 'luxon';
import { useRouter } from "next/navigation";
import {
    User,
    signInWithPopup,
    onAuthStateChanged
} from "firebase/auth";
import { auth, googleProvider } from '@/services/init';
import { saveUserProfile } from '@/services/registration';

interface FormData {
    gender: string;
    dateOfBirth: DateTime | null;
}

const RegistrationPage = () => {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);
    const [formData, setFormData] = useState<FormData>({
        gender: '',
        dateOfBirth: null,
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Listen for auth state changes
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        // Cleanup subscription
        return () => unsubscribe();
    }, []);

    const handleGoogleSignIn = async () => {
        try {
            setLoading(true);
            setError(null);
            await signInWithPopup(auth, googleProvider);
            // User info is set in the useEffect via onAuthStateChanged
        } catch (error) {
            console.error("Error signing in with Google:", error);
            setError("Failed to sign in with Google. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDateChange = (newDate: DateTime | null) => {
        // Validate date before setting it
        if (newDate && newDate.isValid) {
            setFormData(prev => ({
                ...prev,
                dateOfBirth: newDate
            }));
        }
    };

    const handleSubmit = async () => {
        setError(null);

        // Validation
        if (!user) {
            setError("You must be signed in");
            return;
        }

        if (!formData.gender) {
            setError("Please select a gender");
            return;
        }

        if (!formData.dateOfBirth) {
            setError("Please select your date of birth");
            return;
        }

        // Extra validation to ensure valid date
        if (!formData.dateOfBirth.isValid) {
            setError("Please select a valid date of birth");
            return;
        }

        try {
            setLoading(true);

            // Convert Luxon DateTime to JavaScript Date for Firestore
            const jsDate = formData.dateOfBirth.toJSDate();

            // Save user data to Firestore using the separated service
            await saveUserProfile(user, formData.gender, jsDate);

            router.push('./dashboard');
        } catch (error: any) {
            console.error("Error saving user data:", error);
            setError(error.message || "Error saving your data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterLuxon}>
            <Box
                sx={{
                    minHeight: '100vh',
                    backgroundColor: 'background.default',
                    color: 'text.primary',
                    py: 4,
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <Container maxWidth="sm">
                    <Paper
                        elevation={3}
                        sx={{
                            backgroundColor: 'background.paper',
                            borderRadius: 2,
                            p: 4
                        }}
                    >
                        <Typography
                            variant="h4"
                            color="primary"
                            align="center"
                            gutterBottom
                            sx={{ mb: 4 }}
                        >
                            Create Your Profile
                        </Typography>

                        {error && (
                            <Box sx={{ mb: 2, p: 2, bgcolor: 'error.light', borderRadius: 1 }}>
                                <Typography color="error.main">{error}</Typography>
                            </Box>
                        )}

                        {!user ? (
                            <Box sx={{ textAlign: 'center' }}>
                                <Typography variant="body1" sx={{ mb: 3 }}>
                                    Please sign in with Google to continue
                                </Typography>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleGoogleSignIn}
                                    disabled={loading}
                                    sx={{ width: '80%', py: 1.5 }}
                                >
                                    {loading ? "Signing in..." : "Sign in with Google"}
                                </Button>
                            </Box>
                        ) : (
                            <>
                                <Box sx={{ mb: 3, textAlign: 'center' }}>
                                    <Typography variant="body1">
                                    </Typography>
                                </Box>

                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <FormControl fullWidth variant="outlined">
                                            <InputLabel>Gender</InputLabel>
                                            <Select
                                                name="gender"
                                                value={formData.gender}
                                                onChange={handleChange}
                                                label="Gender"
                                                sx={{
                                                    color: 'text.primary',
                                                    '& .MuiSelect-icon': { color: 'primary.main' }
                                                }}
                                            >
                                                <MenuItem value="male">Male</MenuItem>
                                                <MenuItem value="female">Female</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <DatePicker
                                            label="Date of Birth"
                                            value={formData.dateOfBirth}
                                            onChange={handleDateChange}
                                            disableFuture
                                            sx={{
                                                width: '100%'
                                            }}
                                            slotProps={{
                                                textField: {
                                                    variant: 'outlined',
                                                    fullWidth: true,
                                                    sx: {
                                                        '& .MuiInputBase-root': { color: 'text.primary' },
                                                        '& .MuiInputLabel-root': { color: 'text.secondary' }
                                                    }
                                                }
                                            }}
                                        />
                                    </Grid>
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSubmit}
                                        disabled={loading}
                                        sx={{ width: '50%', py: 1.5 }}
                                    >
                                        {loading ? "Saving..." : "Complete Registration"}
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Paper>
                </Container>
            </Box>
        </LocalizationProvider>
    );
};

export default RegistrationPage;
