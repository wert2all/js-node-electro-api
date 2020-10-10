# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.2.59](https://gitlab.local///compare/v0.2.58...v0.2.59) (2020-08-22)

### Features

-   **api:** add init support of saving image data ([7434c47](https://gitlab.local///commit/7434c47119f2e2765fd419751a20329110fcd933)), closes [#350](https://gitlab.local///issues/350)
-   **api:** add isActive field to image data db ([972c3a6](https://gitlab.local///commit/972c3a6305dc68fe58c0d651b23b4e7d62489697)), closes [#357](https://gitlab.local///issues/357)
-   **api:** check permissions on image update api ([70f8de3](https://gitlab.local///commit/70f8de305a410976712f4c7d7a23450191008875)), closes [#354](https://gitlab.local///issues/354)
-   **api:** get image entity for updating ([19d63be](https://gitlab.local///commit/19d63bef494fb7892010fb733d0ef5e930b09b82)), closes [#355](https://gitlab.local///issues/355)
-   **api:** prepare request object for image update API ([4bec42e](https://gitlab.local///commit/4bec42ec948483249b7872814b6d43b987d981f9)), closes [#352](https://gitlab.local///issues/352)
-   **api:** save image data on update image api ([066383c](https://gitlab.local///commit/066383ccdb44dedee85691d8e336e6275a32b1b5)), closes [#358](https://gitlab.local///issues/358)
-   **api:** update image entity by post data ([4cc8d08](https://gitlab.local///commit/4cc8d089ef604e0571a2ad6794e10fe9b5e5b8ea)), closes [#356](https://gitlab.local///issues/356)
-   **ui:** add submit function to image edit form ([3416587](https://gitlab.local///commit/3416587c1f6092cebc331acce86a2da4c0111b58)), closes [#347](https://gitlab.local///issues/347)
-   **ui:** create DomFormRequestModifierInterface of image edit form ([0c88f66](https://gitlab.local///commit/0c88f66217c70913120248725b2ae37e230d9db1)), closes [#349](https://gitlab.local///issues/349)
-   **ui:** sent data to api from image edit form ([d9414ae](https://gitlab.local///commit/d9414aec9a2b14f899c07a1f8293cfab1b2023f9)), closes [#348](https://gitlab.local///issues/348)
-   **ui:** sent data to api from image edit form ([30924ae](https://gitlab.local///commit/30924ae1d2979f109217dcd4fd6c3df96ef8cfa3)), closes [#348](https://gitlab.local///issues/348)

### Bug Fixes

-   **api:** fix id as NaN on API request ([0904006](https://gitlab.local///commit/0904006c74e0c029c49da7f61f4eeb99b4c22d19)), closes [#353](https://gitlab.local///issues/353)
-   **infra:** fiz github actions ([5eb08b9](https://gitlab.local///commit/5eb08b9fa6e37cd3b986f39dae91f0925f1dfd8e))
-   **lib:** fix saving entity ([8c7fb09](https://gitlab.local///commit/8c7fb094cb9860cce1f99069acc5bb815edd93fb)), closes [#359](https://gitlab.local///issues/359)
-   **ui:** add image to edit form action ([68847c0](https://gitlab.local///commit/68847c0a1acde20fd287359cf94736f95f1f0972)), closes [#335](https://gitlab.local///issues/335)
-   **ui:** fix showing is ready in image list ([ac67722](https://gitlab.local///commit/ac677228e29a9980fa4d26c387c205bda51c48ab)), closes [#360](https://gitlab.local///issues/360)
-   **ui:** ui design of image edit form ([beff56f](https://gitlab.local///commit/beff56f28a74ea2bd59621fbe39728b81f6b4653)), closes [#346](https://gitlab.local///issues/346)
-   **ui:** update imagelist after saving image data ([bcc5ea5](https://gitlab.local///commit/bcc5ea596d4e3ae4bc4c09e0d1e510788f17c1c7)), closes [#361](https://gitlab.local///issues/361)

### [0.2.58](https://gitlab.local///compare/v0.2.57...v0.2.58) (2020-08-12)

### Features

-   **ui:** add edit action on image click ([36771cf](https://gitlab.local///commit/36771cff5e9725993e9a356d36f83601f1137c40)), closes [#332](https://gitlab.local///issues/332)
-   **ui:** add radio and checkbox DomFormElements to form ([c18a2f5](https://gitlab.local///commit/c18a2f5f45601c50aaf4d03bcbc22203487da831)), closes [#342](https://gitlab.local///issues/342)
-   **ui:** api returns image path ([2d90f21](https://gitlab.local///commit/2d90f21ce86b63132987682f9c860898b68047ad)), closes [#343](https://gitlab.local///issues/343)
-   **ui:** create class for editing image ([2948e36](https://gitlab.local///commit/2948e3641bd8b2317dd91284a3771a3f53526824)), closes [#338](https://gitlab.local///issues/338)
-   **ui:** create DomFormElementInterface class for checkbox ([1d36c41](https://gitlab.local///commit/1d36c41dfa88fd20f54a4c7e21b2407f01986aa5)), closes [#340](https://gitlab.local///issues/340)
-   **ui:** create DomFormElementInterface class for radio ([92d47f7](https://gitlab.local///commit/92d47f796fe560fffe48f714bbaf629e29c97fd7)), closes [#339](https://gitlab.local///issues/339)
-   **ui:** create form for edit action ([9f4c7fb](https://gitlab.local///commit/9f4c7fb37e874503c9c1b973713b6f4ba729c375)), closes [#334](https://gitlab.local///issues/334)
-   **ui:** create form for edit action ([ff536c9](https://gitlab.local///commit/ff536c9d7d0a2b021b9707f3fdd363be62548161)), closes [#334](https://gitlab.local///issues/334)
-   **ui:** create modal window for edit image action ([e7ba32c](https://gitlab.local///commit/e7ba32caaad43e1655b793736c3598cc0ad248a0)), closes [#333](https://gitlab.local///issues/333)
-   **ui:** set data to form ([5c84075](https://gitlab.local///commit/5c840752da36d4558b702c41159b20490ccadf4b)), closes [#341](https://gitlab.local///issues/341)

### Bug Fixes

-   **ui:** bug with setting Checkbox form element ([5e5b118](https://gitlab.local///commit/5e5b118a23a19c63aa555e3f80f7e223f3665992)), closes [#344](https://gitlab.local///issues/344)
-   **ui:** open image in new browser tab ([e0779d4](https://gitlab.local///commit/e0779d40583e9cbe94bf31ce498a9f7daf7328cb)), closes [#329](https://gitlab.local///issues/329)

### [0.2.57](https://gitlab.local///compare/v0.2.55...v0.2.57) (2020-07-31)

### Features

-   **api:** adds logging to telegram notice ([fcaf5ad](https://gitlab.local///commit/fcaf5adefeb59dbbcdb2c67462263b3b26d7bdf5)), closes [#294](https://gitlab.local///issues/294)
-   **api:** initialize api for fetching user profile ([66c9e70](https://gitlab.local///commit/66c9e70d0b661086a041c69f2696fe99ff253ee8)), closes [#298](https://gitlab.local///issues/298)
-   **api:** initialize api for fetching user profile ([c038799](https://gitlab.local///commit/c03879966d103e815974bfbff7e54e7289b5845d)), closes [#298](https://gitlab.local///issues/298)
-   **api:** initialize api for fetching user profile ([3c4372b](https://gitlab.local///commit/3c4372b6596ea8a8bed1d14cb2e6dccc5008d4ae)), closes [#298](https://gitlab.local///issues/298)
-   **ui:** add error tooltip fot FormElements ([9fc3e99](https://gitlab.local///commit/9fc3e99d4de652a77030aedd3c71ce6d43c0fe1e)), closes [#313](https://gitlab.local///issues/313)
-   **ui:** add labels to profile form template ([5390e7d](https://gitlab.local///commit/5390e7d2dc975c872d64d673c9195ba567751d65)), closes [#314](https://gitlab.local///issues/314)
-   **ui:** add loader to user profile modal ([34db036](https://gitlab.local///commit/34db0365ab9256ca2b6b2a5d80d85445b1c45dcc)), closes [#306](https://gitlab.local///issues/306)
-   **ui:** add profile data to UserProfile class on showing profile ([3963bcc](https://gitlab.local///commit/3963bcc2b8fc380ef653d66f97bbe581ce6d9451)), closes [#304](https://gitlab.local///issues/304)
-   **ui:** add submit function to profile form ([38adb18](https://gitlab.local///commit/38adb18aeb1ba72e1a92545de23a669b73522034)), closes [#310](https://gitlab.local///issues/310)
-   **ui:** add user id Field to profile ([9952573](https://gitlab.local///commit/99525733d0e7bc1a0d16e9dca64e46b7f214fd44)), closes [#321](https://gitlab.local///issues/321)
-   **ui:** adds fetching user profile ([61f2469](https://gitlab.local///commit/61f2469f48868ee8d7084cf19bdf622da99cd1b4)), closes [#297](https://gitlab.local///issues/297)
-   **ui:** create api update profile method ([c14b93b](https://gitlab.local///commit/c14b93b29bdb45070f0e5b4703d77cccb72f1240)), closes [#320](https://gitlab.local///issues/320)
-   **ui:** create DomFormElementValidatorComposite class ([4e8d9ee](https://gitlab.local///commit/4e8d9ee3ac517e5b2f3855aafc8d7353a97a82f8)), closes [#318](https://gitlab.local///issues/318)
-   **ui:** create DomFormElementValidatorInterface ([7377330](https://gitlab.local///commit/73773308b33bca500d97449fa053e42898cbd019)), closes [#317](https://gitlab.local///issues/317)
-   **ui:** create DomFormElementValidatorNull class ([2c02ba2](https://gitlab.local///commit/2c02ba23ce4d9eee01d8419c7b9d468fa0c42163)), closes [#319](https://gitlab.local///issues/319)
-   **ui:** create getFormData method for DomFormInterface ([9c3d733](https://gitlab.local///commit/9c3d733c6abf4634cc80fe159715d215ed438ac9)), closes [#312](https://gitlab.local///issues/312)
-   **ui:** create method validate for DomFormElementInterface ([c281ffb](https://gitlab.local///commit/c281ffb677c95bc9307052a975f56114db48c30e)), closes [#316](https://gitlab.local///issues/316)
-   **ui:** fetch user profile data from server api ([dc16345](https://gitlab.local///commit/dc16345b1eab264f78f84b5178370a3aab9f833d)), closes [#307](https://gitlab.local///issues/307)
-   **ui:** hide error tooltips on forms ([ac725ce](https://gitlab.local///commit/ac725ce2941f20c23ad6c4e10ef967a5fe036d11)), closes [#315](https://gitlab.local///issues/315)
-   **ui:** prepare form data of profile to correct request format ([2b76ae4](https://gitlab.local///commit/2b76ae40974827ff9a2e18d12df2c66eea1937c8)), closes [#323](https://gitlab.local///issues/323)
-   **ui:** show user profile to avatar click on image list ([94408df](https://gitlab.local///commit/94408df42a5bef08d67a49c327fc41103bbd4206)), closes [#309](https://gitlab.local///issues/309)

### Bug Fixes

-   **api:** fixed saving iban on server ([7da2415](https://gitlab.local///commit/7da2415a8e7b8f7dd446440b03cd6c39a038dda0)), closes [#303](https://gitlab.local///issues/303)
-   **lib:** small fixes ([86fc434](https://gitlab.local///commit/86fc434e27814ec0b6d7692b9188dafe1afac983)), closes [#288](https://gitlab.local///issues/288)
-   **ui:** create validate method for DomFormInterface ([a147f80](https://gitlab.local///commit/a147f808a329acf2210123f87218170223bba99c)), closes [#311](https://gitlab.local///issues/311)
-   **ui:** fix error of auth ([f7d810a](https://gitlab.local///commit/f7d810aa32b776156830e3ef609db07dd886c7db)), closes [#308](https://gitlab.local///issues/308)
-   **ui:** fix showing avatar on image list ([c72a5a5](https://gitlab.local///commit/c72a5a5b1714f950c38f79248ee5c359af8fd8c9)), closes [#322](https://gitlab.local///issues/322)
-   **ui:** show notice on save user profile ([98206c0](https://gitlab.local///commit/98206c089a4f7475addb9cd2bfb9fa1f5ff94a61)), closes [#325](https://gitlab.local///issues/325)

### [0.2.56](https://gitlab.local///compare/v0.2.55...v0.2.56) (2020-07-31)

### Features

-   **api:** adds logging to telegram notice ([fcaf5ad](https://gitlab.local///commit/fcaf5adefeb59dbbcdb2c67462263b3b26d7bdf5)), closes [#294](https://gitlab.local///issues/294)
-   **api:** initialize api for fetching user profile ([66c9e70](https://gitlab.local///commit/66c9e70d0b661086a041c69f2696fe99ff253ee8)), closes [#298](https://gitlab.local///issues/298)
-   **api:** initialize api for fetching user profile ([c038799](https://gitlab.local///commit/c03879966d103e815974bfbff7e54e7289b5845d)), closes [#298](https://gitlab.local///issues/298)
-   **api:** initialize api for fetching user profile ([3c4372b](https://gitlab.local///commit/3c4372b6596ea8a8bed1d14cb2e6dccc5008d4ae)), closes [#298](https://gitlab.local///issues/298)
-   **ui:** add error tooltip fot FormElements ([9fc3e99](https://gitlab.local///commit/9fc3e99d4de652a77030aedd3c71ce6d43c0fe1e)), closes [#313](https://gitlab.local///issues/313)
-   **ui:** add labels to profile form template ([5390e7d](https://gitlab.local///commit/5390e7d2dc975c872d64d673c9195ba567751d65)), closes [#314](https://gitlab.local///issues/314)
-   **ui:** add loader to user profile modal ([34db036](https://gitlab.local///commit/34db0365ab9256ca2b6b2a5d80d85445b1c45dcc)), closes [#306](https://gitlab.local///issues/306)
-   **ui:** add profile data to UserProfile class on showing profile ([3963bcc](https://gitlab.local///commit/3963bcc2b8fc380ef653d66f97bbe581ce6d9451)), closes [#304](https://gitlab.local///issues/304)
-   **ui:** add submit function to profile form ([38adb18](https://gitlab.local///commit/38adb18aeb1ba72e1a92545de23a669b73522034)), closes [#310](https://gitlab.local///issues/310)
-   **ui:** add user id Field to profile ([9952573](https://gitlab.local///commit/99525733d0e7bc1a0d16e9dca64e46b7f214fd44)), closes [#321](https://gitlab.local///issues/321)
-   **ui:** adds fetching user profile ([61f2469](https://gitlab.local///commit/61f2469f48868ee8d7084cf19bdf622da99cd1b4)), closes [#297](https://gitlab.local///issues/297)
-   **ui:** create api update profile method ([c14b93b](https://gitlab.local///commit/c14b93b29bdb45070f0e5b4703d77cccb72f1240)), closes [#320](https://gitlab.local///issues/320)
-   **ui:** create DomFormElementValidatorComposite class ([4e8d9ee](https://gitlab.local///commit/4e8d9ee3ac517e5b2f3855aafc8d7353a97a82f8)), closes [#318](https://gitlab.local///issues/318)
-   **ui:** create DomFormElementValidatorInterface ([7377330](https://gitlab.local///commit/73773308b33bca500d97449fa053e42898cbd019)), closes [#317](https://gitlab.local///issues/317)
-   **ui:** create DomFormElementValidatorNull class ([2c02ba2](https://gitlab.local///commit/2c02ba23ce4d9eee01d8419c7b9d468fa0c42163)), closes [#319](https://gitlab.local///issues/319)
-   **ui:** create getFormData method for DomFormInterface ([9c3d733](https://gitlab.local///commit/9c3d733c6abf4634cc80fe159715d215ed438ac9)), closes [#312](https://gitlab.local///issues/312)
-   **ui:** create method validate for DomFormElementInterface ([c281ffb](https://gitlab.local///commit/c281ffb677c95bc9307052a975f56114db48c30e)), closes [#316](https://gitlab.local///issues/316)
-   **ui:** fetch user profile data from server api ([dc16345](https://gitlab.local///commit/dc16345b1eab264f78f84b5178370a3aab9f833d)), closes [#307](https://gitlab.local///issues/307)
-   **ui:** hide error tooltips on forms ([ac725ce](https://gitlab.local///commit/ac725ce2941f20c23ad6c4e10ef967a5fe036d11)), closes [#315](https://gitlab.local///issues/315)
-   **ui:** prepare form data of profile to correct request format ([2b76ae4](https://gitlab.local///commit/2b76ae40974827ff9a2e18d12df2c66eea1937c8)), closes [#323](https://gitlab.local///issues/323)
-   **ui:** show user profile to avatar click on image list ([94408df](https://gitlab.local///commit/94408df42a5bef08d67a49c327fc41103bbd4206)), closes [#309](https://gitlab.local///issues/309)

### Bug Fixes

-   **api:** fixed saving iban on server ([7da2415](https://gitlab.local///commit/7da2415a8e7b8f7dd446440b03cd6c39a038dda0)), closes [#303](https://gitlab.local///issues/303)
-   **lib:** small fixes ([86fc434](https://gitlab.local///commit/86fc434e27814ec0b6d7692b9188dafe1afac983)), closes [#288](https://gitlab.local///issues/288)
-   **ui:** create validate method for DomFormInterface ([a147f80](https://gitlab.local///commit/a147f808a329acf2210123f87218170223bba99c)), closes [#311](https://gitlab.local///issues/311)
-   **ui:** fix error of auth ([f7d810a](https://gitlab.local///commit/f7d810aa32b776156830e3ef609db07dd886c7db)), closes [#308](https://gitlab.local///issues/308)
-   **ui:** fix showing avatar on image list ([c72a5a5](https://gitlab.local///commit/c72a5a5b1714f950c38f79248ee5c359af8fd8c9)), closes [#322](https://gitlab.local///issues/322)
-   **ui:** show notice on save user profile ([98206c0](https://gitlab.local///commit/98206c089a4f7475addb9cd2bfb9fa1f5ff94a61)), closes [#325](https://gitlab.local///issues/325)

### [0.2.55](https://gitlab.local///compare/v0.2.54...v0.2.55) (2020-07-28)

### [0.2.3](https://gitlab.local///compare/v0.2.54...v0.2.3) (2020-07-28)
