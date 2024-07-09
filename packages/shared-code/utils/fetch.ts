export const customFetch = async <Data>(
    { endpoint, method }: { endpoint: string; method: "GET" | "POST" | "PATCH" | "DELETE" },
    data?: Record<string, unknown>
) => {
    console.log(`fetch: ${method}:${endpoint}`);
    const response = await fetch(`http://localhost:3000/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined
    });

    const json = await response.json();

    if (response.ok) {
        return json as Data;
    } else {
        throw new Error(`Failed to fetch: ${JSON.stringify(json)}`);
    }
};
