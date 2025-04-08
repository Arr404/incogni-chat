'use client'
import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Container,
    Paper,
    Grid,
    Stepper,
    Step,
    StepLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@mui/material';
import {useRouter} from "next/navigation";


const RegistrationPage = () => {
    const router = useRouter();
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        bio:'',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        age: '',
        interests: [],
    });

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleChange = (e: { target: { name: any; value: any; }; } ) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const steps = [
        'Personal Information',
        'Account Details',
        'Profile Setup'
    ];

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <Grid container spacing={2}>

                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Gender</InputLabel>
                                <Select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    label="Gender"
                                    sx={{
                                        color: 'white',
                                        '& .MuiSelect-icon': { color: '#00ADB5' }
                                    }}
                                >
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Age"
                                name="age"
                                type="number"
                                value={formData.age}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    input: { color: 'white' },
                                    '& label': { color: '#CCCCCC' }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 1:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    input: { color: 'white' },
                                    '& label': { color: '#CCCCCC' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={formData.password}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    input: { color: 'white' },
                                    '& label': { color: '#CCCCCC' }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    input: { color: 'white' },
                                    '& label': { color: '#CCCCCC' }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            case 2:
                return (
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="outlined">
                                <InputLabel>Interests</InputLabel>
                                <Select
                                    multiple
                                    name="interests"
                                    value={formData.interests}
                                    onChange={handleChange}
                                    label="Interests"
                                    sx={{
                                        color: 'white',
                                        '& .MuiSelect-icon': { color: '#00ADB5' }
                                    }}
                                >
                                    {[
                                        'Travel', 'Music', 'Sports',
                                        'Reading', 'Cooking', 'Photography',
                                        'Technology', 'Art', 'Fitness'
                                    ].map((interest) => (
                                        <MenuItem key={interest} value={interest}>
                                            {interest}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Bio"
                                name="bio"
                                multiline
                                rows={4}
                                value={formData.bio}
                                onChange={handleChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiInputBase-root': { color: 'white' },
                                    '& label': { color: '#CCCCCC' }
                                }}
                            />
                        </Grid>
                    </Grid>
                );
            default:
                return 'Unknown step';
        }
    };

    const handleSubmit = () => {
        router.push('./dashboard')
        // Handle final submission
        console.log(formData);
    };

    return (

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
                <Container maxWidth="md">
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

                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel
                                        sx={{
                                            '& .MuiStepLabel-label': {
                                                color: 'text.secondary'
                                            },
                                            '& .MuiStepLabel-label.Mui-active': {
                                                color: 'primary.main'
                                            },
                                            '& .MuiStepLabel-label.Mui-completed': {
                                                color: 'primary.main'
                                            }
                                        }}
                                    >
                                        {label}
                                    </StepLabel>
                                </Step>
                            ))}
                        </Stepper>

                        <Box sx={{ mt: 4, mb: 2 }}>
                            {renderStepContent(activeStep)}
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                            <Button
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                color="primary"
                            >
                                Back
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
                            >
                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                            </Button>
                        </Box>
                    </Paper>
                </Container>
            </Box>
    );
};

export default RegistrationPage;
