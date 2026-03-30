"use server";

import { httpDelete } from "@/_lib/server/query-api";
import { redirect } from "next/navigation";

export async function deleteInventory(inventoryId: string) {

      const response = await httpDelete({
        url: `spareparts/${inventoryId}`,
        body: {},
      })

      if (!response.ok) {
        const errorText = await response.text()
        alert('Failed to delete: ' + errorText)
        return
      }
    await response.text();

    redirect(`/home/inventory`);
}