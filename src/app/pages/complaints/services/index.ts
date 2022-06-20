import { ComplaintsReviewService } from "./complaints-review.service";
import { ComplaintModelService } from './complaint-model.service';
import { ComplaintFollowUpService } from "./complaint-follow-up.service";

export const ComplaintsServices = [
    ComplaintModelService,
    ComplaintsReviewService,
    ComplaintFollowUpService
  ]
  