import mongoose from 'mongoose';
export declare function connectDB(): Promise<void>;
export declare const table: mongoose.Model<import("./schema.js").tableType, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, import("./schema.js").tableType, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").tableType & Required<{
    _id: number;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<import("./schema.js").tableType, mongoose.Model<import("./schema.js").tableType, any, any, any, any, any, import("./schema.js").tableType>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./schema.js").tableType, mongoose.Document<unknown, {}, import("./schema.js").tableType, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").tableType & Required<{
    _id: number;
}> & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    _id?: mongoose.SchemaDefinitionProperty<number, import("./schema.js").tableType, mongoose.Document<unknown, {}, import("./schema.js").tableType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    URL?: mongoose.SchemaDefinitionProperty<string, import("./schema.js").tableType, mongoose.Document<unknown, {}, import("./schema.js").tableType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    user?: mongoose.SchemaDefinitionProperty<any, import("./schema.js").tableType, mongoose.Document<unknown, {}, import("./schema.js").tableType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").tableType & Required<{
        _id: number;
    }> & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, import("./schema.js").tableType>, import("./schema.js").tableType>;
export declare const user: mongoose.Model<import("./schema.js").userType, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, import("./schema.js").userType, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").userType & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<import("./schema.js").userType, mongoose.Model<import("./schema.js").userType, any, any, any, any, any, import("./schema.js").userType>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./schema.js").userType, mongoose.Document<unknown, {}, import("./schema.js").userType, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").userType & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    username?: mongoose.SchemaDefinitionProperty<string, import("./schema.js").userType, mongoose.Document<unknown, {}, import("./schema.js").userType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").userType & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    email?: mongoose.SchemaDefinitionProperty<string | undefined, import("./schema.js").userType, mongoose.Document<unknown, {}, import("./schema.js").userType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").userType & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
    password?: mongoose.SchemaDefinitionProperty<string, import("./schema.js").userType, mongoose.Document<unknown, {}, import("./schema.js").userType, {
        id: string;
    }, mongoose.DefaultSchemaOptions> & Omit<import("./schema.js").userType & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }>;
}, import("./schema.js").userType>, import("./schema.js").userType>;
export declare const counter: mongoose.Model<import("./schema.js").counterType, {}, {}, {}, mongoose.Document<unknown, {}, import("./schema.js").counterType, {}, mongoose.DefaultSchemaOptions> & import("./schema.js").counterType & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<import("./schema.js").counterType, mongoose.Model<import("./schema.js").counterType, any, any, any, any, any, import("./schema.js").counterType>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, import("./schema.js").counterType, mongoose.Document<unknown, {}, import("./schema.js").counterType, {}, mongoose.DefaultSchemaOptions> & import("./schema.js").counterType & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, {
    id?: mongoose.SchemaDefinitionProperty<number, import("./schema.js").counterType, mongoose.Document<unknown, {}, import("./schema.js").counterType, {}, mongoose.DefaultSchemaOptions> & import("./schema.js").counterType & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
    count?: mongoose.SchemaDefinitionProperty<number, import("./schema.js").counterType, mongoose.Document<unknown, {}, import("./schema.js").counterType, {}, mongoose.DefaultSchemaOptions> & import("./schema.js").counterType & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }>;
}, import("./schema.js").counterType>, import("./schema.js").counterType>;
//# sourceMappingURL=db.d.ts.map