import { writable } from "svelte/store";

export type SelectionStore = {
  selectedIds: Set<string>;
  isAllSelected: boolean;
};

const initialState: SelectionStore = {
  selectedIds: new Set<string>(),
  isAllSelected: false,
};

export const itemSelectionStore = writable<SelectionStore>(initialState);

// Helper functions for the store
export const itemSelectionActions = {
  // Toggle a single item selection
  toggleSelection: (id: string) => {
    itemSelectionStore.update((state) => {
      const newSelectedIds = new Set(state.selectedIds);

      if (newSelectedIds.has(id)) {
        newSelectedIds.delete(id);
      } else {
        newSelectedIds.add(id);
      }

      return {
        ...state,
        selectedIds: newSelectedIds,
        // Reset all selected state when toggling individual items
        isAllSelected: false,
      };
    });
  },

  // Toggle select all items
  toggleSelectAll: (ids: string[]) => {
    itemSelectionStore.update((state) => {
      // If all items are already selected, clear the selection
      if (state.isAllSelected) {
        return {
          selectedIds: new Set<string>(),
          isAllSelected: false,
        };
      }

      // Otherwise, select all items which means create a new set instance
      return {
        selectedIds: new Set([...ids]),
        isAllSelected: true,
      };
    });
  },

  // Clear all selections
  clearSelection: () => {
    itemSelectionStore.update(() => ({
      selectedIds: new Set<string>(),
      isAllSelected: false,
    }));
  },
};
