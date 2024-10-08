/**
 * Generated by orval v7.1.1 🍺
 * Do not edit manually.
 * API
 * Upload and visualize data
 * OpenAPI spec version: 1.0
 */
import {
  z as zod
} from 'zod'


/**
 * @summary Upload a Raw CSV file
 */
export const telecomsControllerCreateResponse = zod.object({
  "message": zod.string(),
  "totalInserted": zod.number(),
  "totalDuplicated": zod.number(),
  "duplicatedIndexes": zod.array(zod.string())
})


export const telecomsControllerGetAvailabilitiesQueryParams = zod.object({
  "enodebId": zod.coerce.string(),
  "cellId": zod.coerce.string(),
  "startDate": zod.coerce.string(),
  "endDate": zod.coerce.string()
})

export const telecomsControllerGetAvailabilitiesResponseItem = zod.object({
  "resultTime": zod.string(),
  "availability": zod.number()
})
export const telecomsControllerGetAvailabilitiesResponse = zod.array(telecomsControllerGetAvailabilitiesResponseItem)


