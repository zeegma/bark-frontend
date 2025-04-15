<script lang="ts"></script>

<div class="">
  <form action="" class="flex flex-col gap-4">
    <label
      >Full Name
      <input
        type="text"
        name="name"
        required
        class="border border-gray-300 rounded-md p-2"
      />
    </label>
    <label
      >Contact Number
      <input
        type="tel"
        name="contact_number"
        required
        class="border border-gray-300 rounded-md p-2"
      />
    </label>
    <label
      >Facebook Link
      <input
        type="url"
        name="facebook_link"
        required
        class="border border-gray-300 rounded-md p-2"
      />
    </label>
    <label>
      Detailed Description
      <textarea
        name="description"
        required
        class="border border-gray-300 rounded-md p-2"
      ></textarea>
    </label>
    <label>
      Ownership Photo
      <input
        type="file"
        name="photo"
        accept="image/*"
        required
        class="border border-gray-300 rounded-md p-2"
      />
    </label>
    <button type="submit" class="bg-[#800000] text-white rounded-md p-2">
      Submit Claim
    </button>
  </form>
</div>
