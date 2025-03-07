const CoverLetter = async ({ params }) => {
    const id = await params.id
    return (
        <div className="container mx-auto py-6">
            CoverLetter: {id}
        </div>
    );
}

export default CoverLetter