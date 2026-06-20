import { create } from "zustand";
import { jobRequests as dummyJobRequests } from "../constants/dummyData";

export type JobRequestStatus =
  | "Pending"
  | "Accepted"
  | "Completed"
  | "Declined";

export type JobRequest = {
  id: string;
  client: string;
  service: string;
  date: string;
  amount: number;
  status: JobRequestStatus;
};

type WorkerState = {
  available: boolean;
  jobRequests: JobRequest[];
  toggleAvailability: () => void;
  updateRequestStatus: (id: string, status: JobRequestStatus) => void;
};

export const useWorkerStore = create<WorkerState>((set) => ({
  available: true,
  jobRequests: dummyJobRequests.map((req) => ({
    ...req,
    status: req.status as JobRequestStatus,
  })),
  toggleAvailability: () =>
    set((state) => ({
      available: !state.available,
    })),
  updateRequestStatus: (id, status) =>
    set((state) => ({
      jobRequests: state.jobRequests.map((r) =>
        r.id === id ? { ...r, status } : r,
      ),
    })),
}));