import { Timestamp } from 'firebase/firestore';

export interface Snippet {
    id: string;
    text: string;
    geo_cell: string;
    alias: string;
    created_at: Timestamp;
    expires_at: Timestamp;
    reports: number;
    status: 'active' | 'flagged' | 'removed';
    owner_id?: string;
}

export interface LocationState {
    geoCell: string | null;
    error: string | null;
    isLoading: boolean;
    permissionGranted: boolean;
}

export interface SubmitSnippetRequest {
    text: string;
    geoCell: string;
    alias: string;
}

export interface SubmitSnippetResponse {
    success: boolean;
    error?: string;
    snippet?: Snippet;
}
