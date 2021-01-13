import { container } from "tsyringe";
import MemoryNotificationRepository from "./implementations/MemoryNotificationRepository";

container.registerInstance('NotificationRepository', new MemoryNotificationRepository());
