import z from "zod/v4";

const vendoStationSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
});

export type VendoStation = z.infer<typeof vendoStationSchema>

const vendoStopSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
});

const vendoLocationSchema = z.object({
	id: z.string(),
	name: z.string().optional(),
});

const vendoPriceSchema = z.object({ amount: z.number(), hint: z.string().optional() });

export type VendoPrice = z.infer<typeof vendoPriceSchema>

const vendoLineSchema = z.object({
	name: z.string(),
	product: z.string().optional(),
	productName: z.string().optional(),
	mode: z.string().or(z.object()).optional(),
});

const originOrDestinationSchema = vendoStationSchema
	.or(vendoStopSchema)
	.or(vendoLocationSchema)
	.optional();

export type VendoOriginOrDestination = z.infer<typeof originOrDestinationSchema>

const stopoverSchema = z.object({
	arrival: z.unknown().optional(),
	departure: z.unknown().optional(),
	stop: vendoStopSchema.optional(),
	loadFactor: z.unknown()
})

// TODO maybe departure and arrivel only exist if duration also exists?

const vendoLegSchema = z.object({
	origin: originOrDestinationSchema,
	destination: originOrDestinationSchema,
	departure: z.string(),
	line: vendoLineSchema.optional(),
	arrival: z.string(),
	mode: z.string().optional(),
	duration: z.unknown(),
	walking: z.unknown(),
	departurePlatform: z.string().optional(),
	arrivalPlatform: z.string().optional(),
	delay: z.number().optional(),
	cancelled: z.boolean().optional(),
	stopovers: z.array(stopoverSchema).optional(),
});

export type VendoLeg = z.infer<typeof vendoLegSchema>;

export const vendoJourneySchema = z.object({
	legs: z.array(vendoLegSchema),
	price: vendoPriceSchema.optional(),
	duration: z.unknown().optional(),
});

export type VendoJourney = z.infer<typeof vendoJourneySchema>;
