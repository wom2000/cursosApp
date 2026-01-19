import MainLayout from "@/Layouts/MainLayout";
import { Head } from "@inertiajs/react";

export default function ManageSubscription() {
    return (
        <MainLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Gerir Subscrição{" "}
                </h2>
            }
        >
            <Head title="Gerir Subscrição" />
            <div>Aqui dá para gerir a subscrição</div>
        </MainLayout>
    );
}
