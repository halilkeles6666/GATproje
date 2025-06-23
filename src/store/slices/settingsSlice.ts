import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    theme: 'light' | 'dark';
    notifications: boolean;
    language: string;
}

const initialState: SettingsState = {
    theme: 'light',
    notifications: true,
    language: 'tr',
};

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
            state.theme = action.payload;
        },
        toggleNotifications: (state) => {
            state.notifications = !state.notifications;
        },
        setLanguage: (state, action: PayloadAction<string>) => {
            state.language = action.payload;
        },
    },
});

export const { setTheme, toggleNotifications, setLanguage } = settingsSlice.actions;
export default settingsSlice.reducer; 