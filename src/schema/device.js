export const schemaListDevice = {
    data: [
        "id",
        "createdBy",
        "created",
        "isActive",
        "locationId",
        "outletId",
        "phoneNumber",
        "notes",

        "outlet.id",
        "outlet.name",
        "outlet.rate",
        "outlet.createdBy",
        "outlet.created",
        "outlet.isActive",

        "addBy.id",
        "addBy.name",
        "addBy.userName",
        "addBy.role",
        "addBy.createdBy",
        "addBy.created",
        "addBy.updatedBy",
        "addBy.updated",
        "addBy.isActive",

        "location.id",
        "location.name",
        "location.createdBy",
        "location.created",
        "location.isActive"
    ]
};

export const schemaDetailDevice = {
    data: [
        "id",
        "createdBy",
        "created",
        "updatedBy",
        "updated",
        "isActive",
        "locationId",
        "outletId",
        "notes",
        "phoneNumber"
    ]
}