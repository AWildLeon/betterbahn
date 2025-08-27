import type { VendoLeg } from "@/utils/schemas";
import {
	formatDuration,
	TrainIdentifier,
	formatTime,
} from "./journey-card-utils";
import { LegDuration } from "./LegDuration";

export const LegDetails = ({
	leg,
	legIndex,
}: {
	leg: VendoLeg;
	legIndex: number;
}) => {
	if (leg.walking) {
		return (
			<div className="text-xs text-gray-600 py-1">
				<span className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-xs">
					🚶 Walk {formatDuration(leg.duration)}
				</span>
			</div>
		);
	}

	return (
		<div className="space-y-1">
			<div className="flex items-center gap-2">
				<span className="font-medium text-sm flex items-center gap-1">
					Leg {legIndex + 1}:
					<span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold">
						<TrainIdentifier leg={leg} />
					</span>
					{leg.line?.mode && (
						<span className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-xs">
							{typeof leg.line.mode === "string"
								? leg.line.mode
								: JSON.stringify(leg.line.mode)}
						</span>
					)}
				</span>
			</div>
			<div className="ml-4 text-xs text-gray-600">
				<span className="font-medium">{leg.origin?.name}</span>
				<span className="mx-1">
					({formatTime(leg.departure)}
					{leg.departurePlatform && <span>, Pl. {leg.departurePlatform}</span>})
				</span>
				<span className="mx-2">→</span>
				<span className="font-medium">{leg.destination?.name}</span>
				<span className="mx-1">
					({formatTime(leg.arrival)}
					{leg.arrivalPlatform && <span>, Pl. {leg.arrivalPlatform}</span>})
				</span>
				<span className="ml-2 text-gray-500">
					<LegDuration leg={leg} />
				</span>
				{leg.delay && leg.delay > 0 && (
					<span className="ml-2 bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
						+{leg.delay}min
					</span>
				)}
				{leg.cancelled && (
					<span className="ml-2 bg-red-200 text-red-700 px-2 py-1 rounded text-xs">
						⚠️ Cancelled
					</span>
				)}
			</div>
		</div>
	);
};
