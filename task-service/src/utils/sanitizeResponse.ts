export const sanitizeResponse = (data: any) => {
    if (Array.isArray(data)) {
        return data.map(item => sanitizeObject(item));
    } else {
        return sanitizeObject(data);
    }
};

const sanitizeObject = (obj: any) => {
    const sanitizedObject: any = {};
    for (const key in obj) {
        if (!key.startsWith('_')) {
            sanitizedObject[key] = obj[key];
        }
    }
    return sanitizedObject;
};
