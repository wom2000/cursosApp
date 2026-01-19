import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function CreateSubscription() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Subscrever{" "}
                </h2>
            }
        >
            <Head title="Subscrever" />
            <div>Aqui dá para subscrever</div>
        </MainLayout>
    );
}
