import { List } from "@raycast/api";
import { usePlans } from "~/hooks/use-plans";
import { useCallback, useEffect, useState } from "react";
import { PlanOptions } from "~/types";

export type PlanDropdownProps = {
    value?: PlanOptions;
    onSelect?: (plan: string) => void;
};

export const PlanDropdown = ({
    value = "default",
    onSelect,
}: PlanDropdownProps) => {
    const { plans, defaultPlan, isLoading } = usePlans();
    const [selectedPlan, setSelectedPlan] = useState<string>(value);

    useEffect(() => {
        if (!defaultPlan) {
            return;
        }

        setSelectedPlan(defaultPlan.id);
    }, [defaultPlan]);

    const handleSelect = useCallback(
        (plan: string) => {
            setSelectedPlan(plan);

            if (onSelect && typeof onSelect === "function") {
                onSelect(plan);
            }
        },
        [onSelect, setSelectedPlan],
    );

    return (
        <List.Dropdown
            tooltip="Plan"
            value={selectedPlan}
            isLoading={isLoading}
            onChange={handleSelect}
        >
            {plans?.map((plan) => (
                <List.Dropdown.Item
                    key={plan.id}
                    title={plan.name}
                    value={plan.id}
                />
            ))}
        </List.Dropdown>
    );
};
