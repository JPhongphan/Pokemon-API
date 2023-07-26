<template>
    <div class="circle-bg"></div>
    <section class="section-body d-flex justify-content-center align-items-center">
        <div class="container mt-5 mb-5">
            <div class="row">
                <div class="col-lg d-flex flex-column justify-content-between" style="gap: 20px;">
                    <div class="container"
                        style="background-color: white; border: 5px solid rgb(236, 236, 236); border-radius: 20px; padding: 10px;">
                        <div class="ps-2 pe-2 mt-3 mb-4">
                            <h1>#{{ pokemons.id }} {{ pokemons.name ? pokemons.name.toUpperCase() : '' }}</h1>
                        </div>
                        <div class="d-flex flex-column ps-2 pe-2" style="gap: 10px;">
                            <h2 style="font-weight: 600;">BASE STAT</h2>
                            <div class="d-flex flex-row align-items-center" v-for="(stats, index) in pokemons.stats"
                                :key="index" style="gap: 20px;">
                                <div class="" style="width: 200px;">
                                    <p style="margin: 0px;">{{ stats.stat.name.toUpperCase() }} : </p>
                                </div>
                                <div style="width: 80%; height: 20px; background-color: #CBCBCB; border-radius: 50px;">
                                    <div class="text-end" :class="getStatClass(stats.stat.name)"
                                        :style="{ width: stats.base_stat / 2.5 + '%', height: '20px', 'border-radius': '50px', 'transition': 'all 0.5s ease'}">
                                        <p style="padding: 0px 5px; margin: 0px; color: white; font-size: 15px;">{{ stats.base_stat }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="d-flex justify-content-center content text-center mb-3 mt-5" style="gap: 10px;">
                            <div class="empty d-flex flex-column justify-content-center  text-center">
                                <p style="color: transparent;">.</p>
                                <p style="color: transparent;">.</p>
                            </div>
                            <div class="ability-box d-flex flex-column justify-content-center align-items-center  text-center"
                                v-for="(type, index) in pokemons.types" :key="index" :class="getTypeClass(type.type.name)">
                                <img :src="getAbilityIconUrl(type.type.name)" :alt="type.type.name.toUpperCase()"
                                    class="ability-icon" />
                                <p style="color: white;">{{ type.type.name.toUpperCase() }}</p>
                            </div>
                            <div class="empty d-flex flex-column justify-content-center  text-center">
                                <p style="color: transparent;">.</p>
                                <p style="color: transparent;">.</p>
                            </div>
                        </div>
                    
                    <div class="d-flex justify-content-center content text-center mb-4" style="gap: 20px;">
                        <button class="btn-pre" @click="previousPokemon">PREVIOUS</button>
                        <button class="btn-icon" @click="randomPokemon"><i class="bi bi-heart-fill"></i></button>
                        <button class="btn-next" @click="nextPokemon">NEXT</button>
                    </div>
                </div>
                </div>
                <div class="col-lg text-center">
                    <img class="img-pokemon .move" :src="getOfficialArtworkUrl(pokemons.id)" alt="">
                    <div class="img-shadow"></div>
                </div>
            </div>
        </div>
    </section>
</template>
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
    data() {
        return {
            icon_types: {
                icon_normal: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl62-5a7d2cd1-0e54-4a3f-870d-bce6d157a84f.png/v1/fill/w_1280,h_1280/normal_type_symbol_galar_by_jormxdos_dffvl62-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw2Mi01YTdkMmNkMS0wZTU0LTRhM2YtODcwZC1iY2U2ZDE1N2E4NGYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6WIqtbC5CGYGzevXOzcj0_mP0hLVcWBD3hHs95hhCZw",
                icon_fighting: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl1w-af8f2039-82d6-44f3-b06f-2446aff1db82.png/v1/fill/w_894,h_894/fighting_type_symbol_galar_by_jormxdos_dffvl1w-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxdy1hZjhmMjAzOS04MmQ2LTQ0ZjMtYjA2Zi0yNDQ2YWZmMWRiODIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.pUH2kjRpC3pnjJTusKxTqAW4SmmS5Mm0bNXcBR9xIdI",
                icon_flying: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl6n-4e403272-f641-4ec0-a451-49061d40aef6.png/v1/fill/w_1280,h_1280/flying_type_symbol_galar_by_jormxdos_dffvl6n-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw2bi00ZTQwMzI3Mi1mNjQxLTRlYzAtYTQ1MS00OTA2MWQ0MGFlZjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.xTE63SRI89iYddks3zDYryz4UkqEFOCAOH5_feLbQHs",
                icon_poison: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl5p-899b860a-d006-4425-86fb-012844c1e8d3.png/v1/fill/w_894,h_894/poison_type_symbol_galar_by_jormxdos_dffvl5p-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw1cC04OTliODYwYS1kMDA2LTQ0MjUtODZmYi0wMTI4NDRjMWU4ZDMucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.hz_DHqV4XnnzPBce9SWmcaUmx6-egrOyvj2rNqS9ywY",
                icon_ground: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl6w-4d2813ab-f8b9-4680-a2b9-5cd8cba67e62.png/v1/fill/w_1280,h_1280/ground_type_symbol_galar_by_jormxdos_dffvl6w-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw2dy00ZDI4MTNhYi1mOGI5LTQ2ODAtYTJiOS01Y2Q4Y2JhNjdlNjIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.mi6G6qA4y9sPShd2XU7_6zc75r0f-07Wc8R2S9F-JtM",
                icon_rock: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl3a-c5227b2a-e30d-4235-975f-2c7f933e6e6e.png/v1/fill/w_894,h_894/rock_type_symbol_galar_by_jormxdos_dffvl3a-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwzYS1jNTIyN2IyYS1lMzBkLTQyMzUtOTc1Zi0yYzdmOTMzZTZlNmUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.cFxsqSWmRdkJEASQm0a-NabpZLvozfi8QM4239W3fww",
                icon_bug: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl73-294f6e5b-aad2-484f-bde8-1ecf082f1dfe.png/v1/fill/w_894,h_894/bug_type_symbol_galar_by_jormxdos_dffvl73-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw3My0yOTRmNmU1Yi1hYWQyLTQ4NGYtYmRlOC0xZWNmMDgyZjFkZmUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.msN6ZkYf5XuPiA27qO-1Zaow3B4iSRqp3nAHzctfBW0",
                icon_ghost: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl2d-818164a9-f8e6-41fc-ba4e-c725e2be0d66.png/v1/fill/w_894,h_894/ghost_type_symbol_galar_by_jormxdos_dffvl2d-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwyZC04MTgxNjRhOS1mOGU2LTQxZmMtYmE0ZS1jNzI1ZTJiZTBkNjYucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.YKEzh2shCheghxM31oOkuEOOrQlMeW1axtKAyK-Iceg",
                icon_steel: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl50-eef3fc08-9339-4135-8c19-76be942c77ab.png/v1/fill/w_894,h_894/steel_type_symbol_galar_by_jormxdos_dffvl50-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw1MC1lZWYzZmMwOC05MzM5LTQxMzUtOGMxOS03NmJlOTQyYzc3YWIucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ppmW3CGOkmE6wnnFeeSlv0QToZ-DiNxKFhdVizDzhck",
                icon_fire: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl1m-a992d76d-bfa4-41cd-bff6-7546b47f2184.png/v1/fill/w_894,h_894/fire_type_symbol_galar_by_jormxdos_dffvl1m-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxbS1hOTkyZDc2ZC1iZmE0LTQxY2QtYmZmNi03NTQ2YjQ3ZjIxODQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.DBmvPsi4hX6q3f8XHGcinkRbtbV2zsh5nB-_s9wse_4",
                icon_water: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl12-8e849c4d-fb0e-4d08-b673-0ae59eee5805.png/v1/fill/w_1280,h_1280/water_type_symbol_galar_by_jormxdos_dffvl12-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwxMi04ZTg0OWM0ZC1mYjBlLTRkMDgtYjY3My0wYWU1OWVlZTU4MDUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.PmOI40XikNF0a-5I1ua_tL0uVAD5znTSd38Vb6qaKBU",
                icon_grass: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl0s-d443a3b4-fa4e-47a6-99b4-d2a769785614.png/v1/fill/w_1280,h_1280/grass_type_symbol_galar_by_jormxdos_dffvl0s-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwwcy1kNDQzYTNiNC1mYTRlLTQ3YTYtOTliNC1kMmE3Njk3ODU2MTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6-S1a0_YYhlP6eXW5QqrJk4jtv6b5a3MRuugxqhJ6EA",
                icon_electric: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl6b-dde44f5e-8bc6-4627-88dc-897d937b57ee.png/v1/fill/w_1280,h_1280/electric_type_symbol_galar_by_jormxdos_dffvl6b-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw2Yi1kZGU0NGY1ZS04YmM2LTQ2MjctODhkYy04OTdkOTM3YjU3ZWUucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.ylqFNiIPplKYSHm9NxvolhBO4PIWAn5PWX3L4iFPQXs",
                icon_psychic: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl5b-bde5e34d-f803-4631-9c9d-84c7512d0254.png/v1/fill/w_894,h_894/psychic_type_symbol_galar_by_jormxdos_dffvl5b-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw1Yi1iZGU1ZTM0ZC1mODAzLTQ2MzEtOWM5ZC04NGM3NTEyZDAyNTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.GdprCZ3xkD5I-yvUUfHtmkyBpuexlOXXO_amm1s-HNk",
                icon_ice: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl40-c3b719e6-2acc-48e0-882a-ac3058a944b9.png/v1/fill/w_894,h_894/ice_type_symbol_galar_by_jormxdos_dffvl40-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw0MC1jM2I3MTllNi0yYWNjLTQ4ZTAtODgyYS1hYzMwNThhOTQ0YjkucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.OUuCZGLYjzvozAeQwII4FV6Ef9RZkVPE0Tf17C5qa2I",
                icon_dragon: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl4n-1942f6ac-3f08-4dbb-a761-a722f791bc37.png/v1/fill/w_1280,h_1280/dragon_type_symbol_galar_by_jormxdos_dffvl4n-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw0bi0xOTQyZjZhYy0zZjA4LTRkYmItYTc2MS1hNzIyZjc5MWJjMzcucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.Q9B0RKlPeJSmVIrfZq75vfmVscHZ50jPWPViMQp68kc",
                icon_dark: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl4c-00dcc9df-03ac-43ca-aeca-bf64e7839ada.png/v1/fill/w_1280,h_1280/dark_type_symbol_galar_by_jormxdos_dffvl4c-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw0Yy0wMGRjYzlkZi0wM2FjLTQzY2EtYWVjYS1iZjY0ZTc4MzlhZGEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7-jDNz2kWWs8QWJBDL1Dmpo2Dx7-oaPY1cWgW48FvNk",
                icon_fairy: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl2x-0d3cd17b-b043-4fe6-9efe-e03e79df84b0.png/v1/fill/w_894,h_894/fairy_type_symbol_galar_by_jormxdos_dffvl2x-pre.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwyeC0wZDNjZDE3Yi1iMDQzLTRmZTYtOWVmZS1lMDNlNzlkZjg0YjAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.29R4ouYaIY5Iu4F4hDV35xJG1g1M3ixja_2jIJl1hPI",
                icon_unknown: "https://sv1.picz.in.th/images/2023/07/23/MlJGJb.png",
                icon_shadow: "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl4c-00dcc9df-03ac-43ca-aeca-bf64e7839ada.png/v1/fill/w_1280,h_1280/dark_type_symbol_galar_by_jormxdos_dffvl4c-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmw0Yy0wMGRjYzlkZi0wM2FjLTQzY2EtYWVjYS1iZjY0ZTc4MzlhZGEucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.7-jDNz2kWWs8QWJBDL1Dmpo2Dx7-oaPY1cWgW48FvNk",
            }
        }
    },
    methods: {
        getStatClass(statName){
            return statName.toLowerCase() + "-stat";
        },
        getTypeClass(typeName) {
            return typeName.toLowerCase() + "-type";
        },
        getAbilityIconUrl(typeName) {
            const iconUrl = this.icon_types[`icon_${typeName.toLowerCase()}`];
            return iconUrl ? iconUrl : "";
        },
    },
    setup() {
        const pokemons = ref({});
        const pokeID = ref(1); // Initialize pokeID with the initial value of 1

        const fetchPokemons = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API}/${pokeID.value}`);
                pokemons.value = response.data;
                console.log(response.data)
            } catch (error) {
                console.error(error);
            }
        };

        onMounted(fetchPokemons);

        const getOfficialArtworkUrl = (pokemonId) => {
            return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
        };

        const previousPokemon = () => {
            pokeID.value -= 1; // Decrease the value of pokeID when the Previous button is clicked
            fetchPokemons(); // Fetch data for the updated pokeID
        };

        const nextPokemon = () => {
            pokeID.value += 1; // Increase the value of pokeID when the Next button is clicked
            fetchPokemons(); // Fetch data for the updated pokeID
        };

        const randomPokemon = () => {
            const randomValue = Math.floor(Math.random() * 1000) + 1;
            pokeID.value = randomValue;
            fetchPokemons(); // Fetch data for the updated pokeID
        };
        // Return variables and functions as an object
        return {
            pokemons,
            pokeID,
            getOfficialArtworkUrl,
            previousPokemon,
            nextPokemon,
            fetchPokemons,
            randomPokemon, // Include fetchPokemons in the return object
        };
    },
};
</script>
<style>
.ability-icon {
    width: 40px;
    height: 40px;
}

/* --- 18type-color-background --- */
.normal-type {
    background-color: #B3A392;
}

.flying-type {
    background-color: #648ABC;
}

.poison-type {
    background-color: #B15192;
}

.ground-type {
    background-color: #E6AE44;
}

.rock-type {
    background-color: #AB9153;
}

.bug-type {
    background-color: #A5B614;
}

.ghost-type {
    background-color: #594593;
}

.steel-type {
    background-color: #92A3AA;
}

.fire-type {
    background-color: #DA2C33;
}

.fighting-type {
    background-color: #DD513E;
}

.psychic-type {
    background-color: #D9548C;
}

.ice-type {
    background-color: #38A3C4;
}

.dragon-type {
    background-color: #7C6DA4;
}

.dark-type {
    background-color: #623A26;
}

.water-type {
    background-color: #0067AB;
}

.grass-type {
    background-color: #02913A;
}

.electric-type {
    background-color: #F2C300;
}

.fairy-type {
    background-color: #E3A0C4;
}
/* --- 18type-color-background --- */

/* --- color-stat-bar --- */
.hp-stat{
    background-color: #ED2E49;
}
.attack-stat{
    background-color: #FEA726;
}
.defense-stat{
    background-color: #0091EA;
}
.special-attack-stat{
    background-color: #CB6CE6;
}
.special-defense-stat{
    background-color: #8C52FF;
}
.speed-stat{
    background-color: #00BF63;
}
/* --- color-stat-bar --- */
.grass-type.icon {
    background-image: url('https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/e8ddc4da-23dd-4502-b65b-378c9cfe5efa/dffvl0s-d443a3b4-fa4e-47a6-99b4-d2a769785614.png/v1/fill/w_1280,h_1280/grass_type_symbol_galar_by_jormxdos_dffvl0s-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2U4ZGRjNGRhLTIzZGQtNDUwMi1iNjViLTM3OGM5Y2ZlNWVmYVwvZGZmdmwwcy1kNDQzYTNiNC1mYTRlLTQ3YTYtOTliNC1kMmE3Njk3ODU2MTQucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.6-S1a0_YYhlP6eXW5QqrJk4jtv6b5a3MRuugxqhJ6EA');
    width: 5px;
    height: 5px;
}

.color-stat-bar {
    background: rgb(255, 42, 42);
    background: linear-gradient(90deg, rgba(255, 42, 42, 1) 10%, rgba(255, 192, 30, 1) 100%);
}

.img-shadow {
    position: relative;
    background-color: black;
    z-index: -1;
    margin: 0px 5%;
    padding: 15px;
    border-radius: 200%;
    opacity: 0.4;
    transform: translate(0px, -15px);
    animation-name: shadowMove;
    animation-iteration-count: infinite;
    animation-duration: 3s;
}

.img-pokemon {
    width: 100%;
    z-index: 1;
    animation-name: moveUp;
    animation-iteration-count: infinite;
    animation-duration: 3s;
}

.section-body {
    min-height: 70vh;
}

@media(min-width: 990px) and (max-width:1200px) {
    .img-pokemon {
        width: 100%;
    }
}

@media(min-width: 300px) and (max-width:400px) {
    button {
        font-size: 13px !important;
    }

    h1 {
        font-size: 40px !important;
    }

    .ability-box {
        width: 100px;

    }

    .img-pokemon {
        width: 80%;
    }

    .circle-bg {
        position: fixed;
        clip-path: circle(450px at center 1000px);
    }
}

@media(min-width: 400px) and (max-width:900px) {
    button {
        font-size: 15px !important;
    }

    .circle-bg {
        position: fixed;
        clip-path: circle(550px at center 1200px);
    }
}

@media(min-width: 900px) and (max-width:990px) {
    .img-pokemon {
        width: 50%;
    }
}


@keyframes moveUp {
    0% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }

    100% {
        transform: translateY(0);
    }
}

@keyframes shadowMove {
    0% {
        margin: 0px 0%;
    }

    50% {
        margin: 0px 5%;
    }

    100% {
        margin: 0px 0%;
    }
}</style>