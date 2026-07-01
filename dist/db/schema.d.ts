import { Schema } from 'mongoose';
export interface tableType {
    _id: number;
    URL: string;
    user: any;
}
export interface userType {
    username: string;
    email?: string;
    password: string;
}
export interface counterType {
    id: number;
    count: number;
}
export declare const tableSchema: Schema<tableType, import("mongoose").Model<tableType, any, any, any, any, any, tableType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, tableType, import("mongoose").Document<unknown, {}, tableType, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<tableType & Required<{
    _id: number;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: import("mongoose").SchemaDefinitionProperty<number, tableType, import("mongoose").Document<unknown, {}, tableType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    URL?: import("mongoose").SchemaDefinitionProperty<string, tableType, import("mongoose").Document<unknown, {}, tableType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    user?: import("mongoose").SchemaDefinitionProperty<any, tableType, import("mongoose").Document<unknown, {}, tableType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, tableType>;
export declare const userSchema: Schema<userType, import("mongoose").Model<userType, any, any, any, any, any, userType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, userType, import("mongoose").Document<unknown, {}, userType, {
    id: string;
}, import("mongoose").DefaultSchemaOptions> & Omit<userType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    username?: import("mongoose").SchemaDefinitionProperty<string, userType, import("mongoose").Document<unknown, {}, userType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<userType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: import("mongoose").SchemaDefinitionProperty<string | undefined, userType, import("mongoose").Document<unknown, {}, userType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<userType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: import("mongoose").SchemaDefinitionProperty<string, userType, import("mongoose").Document<unknown, {}, userType, {
        id: string;
    }, import("mongoose").DefaultSchemaOptions> & Omit<userType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, userType>;
export declare const counterSchema: Schema<counterType, import("mongoose").Model<counterType, any, any, any, any, any, counterType>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, counterType, import("mongoose").Document<unknown, {}, counterType, {}, import("mongoose").DefaultSchemaOptions> & counterType & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, {
    id?: import("mongoose").SchemaDefinitionProperty<number, counterType, import("mongoose").Document<unknown, {}, counterType, {}, import("mongoose").DefaultSchemaOptions> & counterType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
    count?: import("mongoose").SchemaDefinitionProperty<number, counterType, import("mongoose").Document<unknown, {}, counterType, {}, import("mongoose").DefaultSchemaOptions> & counterType & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }>;
}, counterType>;
//# sourceMappingURL=schema.d.ts.map