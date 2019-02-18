export default class FileUploadDataGetter {

    static get() {
        const getter = new FileUploadDataGetter();

        return getter.get();
    }

    async get() {
        const [weights, structure] = await Promise.all([
            this.loadWeights(),
            this.loadStructure()
        ]);

        return {
            weights,
            structure
        };
    }

    /**
     * @return {Promise<{}>}
     * @private
     */
    loadStructure () {
        return new Promise(success => {
            const structureFile = document.querySelector('#structure_file');

            const reader = new FileReader();

            reader.onload = () => {
                const structure = JSON.parse(reader.result);

                return success(structure);
            };

            reader.readAsText(structureFile.files[0]);
        });
    }

    /**
     * @return {Promise<{}>}
     * @private
     */
    loadWeights () {
        return new Promise(success => {
            const weightsFile = document.querySelector('#weights_file');

            const reader = new FileReader();
            reader.onload = () => {
                const weights = JSON.parse(reader.result);

                return success(weights);
            };

            reader.readAsText(weightsFile.files[0]);
        });
    }

}