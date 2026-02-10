import { supabase } from "./supabase";

export interface Client {
    id: string;
    name: string;
    email: string;
    status: string;
    files_count: number;
    last_upload: string;
    created_at: string;
}

export const getClients = async () => {
    const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("last_upload", { ascending: false });

    if (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }

    return data as Client[];
};

export const updateClientStatus = async (id: string, status: string) => {
    const { data, error } = await supabase
        .from("clients")
        .update({ status })
        .eq("id", id)
        .select();

    if (error) {
        throw error;
    }

    return data;
};

export interface Document {
    id?: string;
    client_id: string;
    name: string;
    size: string;
    status: string;
    url?: string;
    created_at?: string;
}

export const uploadDocument = async (doc: Document) => {
    const { data, error } = await supabase
        .from("documents")
        .insert([doc])
        .select();

    if (error) {
        throw error;
    }

    // Increment client's file count
    await supabase.rpc('increment_client_file_count', { client_id_input: doc.client_id });

    return data;
};

export const getClientDocuments = async (clientId: string) => {
    const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("client_id", clientId)
        .order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    return data as Document[];
};
