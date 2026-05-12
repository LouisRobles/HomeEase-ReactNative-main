# HomeEase Implementation Plan - Visual + TODO

## ARCHITECTURE DIAGRAM

```
┌─────────────────────────────────────────────────────────────────┐
│                   REACT NATIVE / EXPO APP                       │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                   UI COMPONENTS                          │   │
│  │  (Screens, Cards, Forms, Buttons, Modals, etc.)        │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │              ZUSTAND STATE STORES                        │   │
│  │  ┌──────────┐  ┌────────────┐  ┌──────────┐            │   │
│  │  │authStore │  │bookingStore│  │notifStore│            │   │
│  │  └──────────┘  └────────────┘  └──────────┘            │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │        services/storage.ts (CRUD DATA LAYER)            │   │
│  │                                                          │   │
│  │   Users:   getUser • createUser • updateUser            │   │
│  │   Bookings: getBookings • createBooking • updateBooking│   │
│  │   Messages: getMessages • createMessage                 │   │
│  │   Reviews:  getReviews • createReview                   │   │
│  │   Workers:  getWorkers • getWorkerById • updateWorker   │   │
│  │   Chats:    getConversations • createConversation       │   │
│  │                                                          │   │
│  └────────────────────────┬────────────────────────────────┘   │
│                           │                                      │
│  ┌────────────────────────▼────────────────────────────────┐   │
│  │        ASYNC STORAGE (Persistent Local DB)              │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐                │   │
│  │  │  users   │ │bookings  │ │messages  │                │   │
│  │  ├──────────┤ ├──────────┤ ├──────────┤                │   │
│  │  │ workers  │ │ reviews  │ │chats     │                │   │
│  │  ├──────────┤ ├──────────┤ ├──────────┤                │   │
│  │  │categories│ │transactn │ │schedule  │                │   │
│  │  └──────────┘ └──────────┘ └──────────┘                │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                   │
│            📱 Data Persists When App Closes/Reopens             │
│            ✅ Works Offline - No Internet Required              │
└─────────────────────────────────────────────────────────────────┘

        ⬇️  FUTURE: Backend Integration (Month 2)

┌─────────────────────────────────────────────────────────────────┐
│  NODE.JS / EXPRESS + POSTGRESQL (Backend - Not Building Yet)    │
│  Just replace storage.ts calls with API.get/post calls          │
└─────────────────────────────────────────────────────────────────┘
```

---

## IMPLEMENTATION TIMELINE

```
WEEK 1                      WEEK 2                   WEEK 3             WEEK 4
────────────────────      ─────────────────────    ───────────────    ──────────────────
Days 1-3                  Days 6-8                 Days 11-12         Days 15-20
PHASE 1 & 2               PHASE 3 & 4              PHASE 5 & 6        PHASE 7, 8, 9
─────────────────────────────────────────────────────────────────────────────────────
│                         │                        │                  │
├─ Fix Nav Freezes       ├─ Payment Form          ├─ Messaging      ├─ Worker App
├─ Create storage.ts     ├─ Booking CRUD          ├─ Reviews        ├─ Dev Tools
├─ Auth + Sign-up        ├─ Transactions          ├─ Worker Ratings ├─ Polish
├─ User Hydration        └─ Payment Success       └─ Dynamic Data   └─ Full Testing
│
├─ Days 4-5              ├─ Days 9-10
│ Auth Login              │ Search Screen
│ Zustand Stores          │ Worker Details
│ Test Auth

✅ MVP Core Ready        ✅ Booking Flow          ✅ Social &      ✅ COMPLETE
✅ Data Persistent       ✅ Works End-to-End      Ratings Works    ✅ Demo-Ready
```

---

## DETAILED TODO LIST BY PHASE

# ⭐ PHASE 1: FIX CRASHES + SETUP STORAGE (Days 1-3)

**Estimated: 4-5 hours | Critical: Must complete before Phase 2**

## 1.1 FIX NAVIGATION FREEZES (1 hour)

These are causing the app to hang when navigating to tab screens. Remove the problematic `useEffect` hooks.

- [ ] **File:** `mobile/app/(client)/booking/index.tsx`
  - Remove: `useEffect(() => { navigation.addListener("tabPress", ...) })`
  - Keep everything else
  - Task: Delete lines with `CommonActions.reset()`

- [ ] **File:** `mobile/app/(client)/category/index.tsx`
  - Same as above - remove navigation reset hook

- [ ] **File:** `mobile/app/(client)/inbox/index.tsx`
  - Same as above - remove navigation reset hook

- [ ] **File:** `mobile/app/(client)/profile/index.tsx`
  - Same as above - remove navigation reset hook

- [ ] **File:** `mobile/app/(worker)/earnings/index.tsx`
  - Same as above - remove navigation reset hook

- [ ] **Test:**
  - Sign in with email
  - Tap each tab (Home, Bookings, Category, Inbox, Profile)
  - Verify no freeze, buttons respond
  - Go back using Android back button
  - ✓ All works smooth?

## 1.2 CREATE STORAGE SERVICE (2.5-3 hours)

This is the database layer. All data goes through here.

- [ ] **File:** Create `mobile/services/storage.ts` (new file)
  - [ ] Add imports:

    ```typescript
    import AsyncStorage from "@react-native-async-storage/async-storage";
    ```

  - [ ] Create helper functions:

    ```typescript
    async function getJSON(key: string, defaultValue: any) { ... }
    async function saveJSON(key: string, value: any) { ... }
    ```

  - [ ] Create USER functions:

    ```typescript
    export async function getUser(id: string);
    export async function createUser(user: User);
    export async function updateUser(id: string, updates: any);
    export async function deleteUser(id: string);
    ```

  - [ ] Create BOOKING functions:

    ```typescript
    export async function getBookings(userId?: string);
    export async function createBooking(booking: Booking);
    export async function updateBooking(id: string, updates: any);
    export async function deleteBooking(id: string);
    ```

  - [ ] Create MESSAGE functions:

    ```typescript
    export async function getMessages(conversationId: string);
    export async function createMessage(message: Message);
    ```

  - [ ] Create CONVERSATION functions:

    ```typescript
    export async function getConversations(userId: string);
    export async function createConversation(convo: Conversation);
    ```

  - [ ] Create REVIEW functions:

    ```typescript
    export async function getReviews(workerId: string);
    export async function createReview(review: Review);
    ```

  - [ ] Create WORKER functions:

    ```typescript
    export async function getWorkers(filters?: any);
    export async function getWorkerById(id: string);
    export async function updateWorker(id: string, updates: any);
    ```

  - [ ] Create CATEGORY functions:

    ```typescript
    export async function getCategories();
    ```

  - [ ] Test: Does storage.ts import without errors? Check syntax.

## 1.3 CREATE INITIALIZATION SERVICE (1-1.5 hours)

Seeds demo data on first app launch.

- [ ] **File:** Create `mobile/services/storageInitialization.ts` (new file)
  - [ ] Create function:

    ```typescript
    export async function initializeAppStorage();
    ```

  - [ ] Check if already init:

    ```typescript
    const isInit = await AsyncStorage.getItem("app_initialized");
    if (isInit) return; // Already done
    ```

  - [ ] Seed CATEGORIES (from existing dummyData):

    ```typescript
    const categories = [
      { id: "1", name: "Plumbing", icon: "wrench" },
      { id: "2", name: "Electrical", icon: "flash" },
      // ... etc
    ];
    await saveJSON("categories", categories);
    ```

  - [ ] Seed DEMO WORKERS (5-8 workers):

    ```typescript
    const workers = [
      { id: 'w1', name: 'John Plumber', hourlyRate: 500, rating: 4.8, ... },
      { id: 'w2', name: 'Maria Electrician', hourlyRate: 600, rating: 4.5, ... },
      // ... etc
    ];
    await saveJSON('workers', workers);
    ```

  - [ ] Seed DEMO CLIENT:

    ```typescript
    const demoUser = {
      id: "demo-client",
      email: "demo@example.com",
      password: "demo123", // plaintext for MVP
      name: "Demo Client",
      role: "client",
      verified: true,
    };
    await saveJSON("users", [demoUser]);
    ```

  - [ ] Initialize empty arrays:

    ```typescript
    await saveJSON("bookings", []);
    await saveJSON("messages", []);
    await saveJSON("conversations", []);
    await saveJSON("reviews", []);
    await saveJSON("transactions", []);
    ```

  - [ ] Set initialization flag:
    ```typescript
    await AsyncStorage.setItem("app_initialized", "true");
    ```

- [ ] **Wire into app startup:**
  - [ ] Open `mobile/app/_layout.tsx`
  - [ ] Import: `import { initializeAppStorage } from '../services/storageInitialization';`
  - [ ] In component, add:
    ```typescript
    useEffect(() => {
      initializeAppStorage();
    }, []);
    ```

- [ ] **Test:**
  - [ ] First app launch → storage gets populated
  - [ ] Close app completely
  - [ ] Reopen → same data still there
  - [ ] Check with React Native debugger or dev tool

---

# ⭐ PHASE 2: AUTH WITH STORAGE (Days 4-5)

**Estimated: 2-3 hours | Depends on Phase 1 ✓**

Users can now create accounts and log in with persistent storage.

## 2.1 UPDATE SIGN-UP (1 hour)

- [ ] **File:** `mobile/app/(auth)/sign-up.tsx`
  - [ ] Import storage:

    ```typescript
    import * as storage from "../../services/storage";
    ```

  - [ ] Update `handleSignUp()` function:

    ```typescript
    const handleSignUp = async () => {
      // ... validation ...

      setLoading(true);
      try {
        const newUser = {
          id: Math.random().toString(36).substr(2, 9), // Generate ID
          email,
          password, // plaintext for MVP (don't use in production!)
          name,
          phone,
          role: role as "client" | "worker",
          verified: false,
          createdAt: new Date().toISOString(),
        };

        // Save to storage
        await storage.createUser(newUser);

        // Save to Zustand store
        setUser(newUser);

        // Navigate
        const destination =
          role === "worker" ? "/(kyc)/landing" : "/(client)/home";
        router.replace(destination);
      } catch (err) {
        Alert.alert("Error", "Failed to create account");
      } finally {
        setLoading(false);
      }
    };
    ```

  - [ ] Test:
    - [ ] Sign up as Client (email: test@client.com, name: Test User)
    - [ ] App navigates to home
    - [ ] Verify data in AsyncStorage (use dev tool or debugger)

## 2.2 UPDATE SIGN-IN (1 hour)

- [ ] **File:** `mobile/app/(auth)/sign-in.tsx`
  - [ ] Import storage:

    ```typescript
    import * as storage from "../../services/storage";
    ```

  - [ ] Update `handleSignIn()` function:

    ```typescript
    const handleSignIn = async () => {
      if (!email.trim() || !password.trim()) {
        Alert.alert("Error", "Please fill in all fields");
        return;
      }

      setLoading(true);
      try {
        // Get all users
        const allUsers = await storage.getJSON("users", []);

        // Find user by email
        const user = allUsers.find((u) => u.email === email);

        // Check password (plaintext for MVP)
        if (!user || user.password !== password) {
          Alert.alert("Error", "Invalid email or password");
          return;
        }

        // Save to Zustand store
        setUser(user);

        // Navigate based on role
        const destination =
          user.role === "worker" ? "/(worker)/home" : "/(client)/home";
        router.replace(destination);
      } catch (err) {
        Alert.alert("Error", "Sign in failed");
      } finally {
        setLoading(false);
      }
    };
    ```

  - [ ] Test:
    - [ ] Sign in with demo account (email: demo@example.com, password: demo123)
    - [ ] Should navigate to client home
    - [ ] Try wrong password → error message

## 2.3 HYDRATE STORES ON APP START (30 min)

When app restarts, remember the logged-in user.

- [ ] **File:** `mobile/store/authStore.ts`
  - [ ] Import storage:

    ```typescript
    import * as storage from "../services/storage";
    ```

  - [ ] Add hydrate function:

    ```typescript
    hydrate: async () => {
      try {
        // Get stored user (or null if first launch)
        const users = await storage.getJSON("users", []);
        const lastUser = users[0]; // or use a key like 'currentUser'

        if (lastUser) {
          set({ user: lastUser, isAuthenticated: true });
        }
      } catch (err) {
        console.error("Hydration failed:", err);
      }
    };
    ```

  - [ ] Call on app start:

    ```typescript
    // In app/_layout.tsx
    useEffect(() => {
      useAuthStore.getState().hydrate();
      initializeAppStorage();
    }, []);
    ```

  - [ ] Test:
    - [ ] Sign in
    - [ ] Close app
    - [ ] Reopen → user still logged in (no sign-in screen)
    - [ ] Sign in as different user → is reflected

---

# ⭐ PHASE 3: BOOKING FLOW WITH PAYMENTS (Days 6-8)

**Estimated: 3-4 hours | Depends on Phase 1-2 ✓**

Complete the booking process from browsing to payment confirmation.

## 3.1 CREATE PAYMENT FORM SCREEN (1.5 hours)

- [ ] **File:** Create/Update `mobile/app/(client)/booking/payment/index.tsx`
  - [ ] Structure:

    ```tsx
    <SafeAreaView>
      <View>
        {" "}
        {/* Booking Summary */}
        <Text>{workerName}</Text>
        <Text>{service} × 3 hours</Text>
        <Text>Total: ₱{amount}</Text>
      </View>

      <View>
        {" "}
        {/* Payment Method Selection */}
        <Pressable onPress={() => setMethod("cash")}>
          <Text>💳 Cash</Text>
        </Pressable>
        <Pressable onPress={() => setMethod("gcash")}>
          <Text>📱 GCash</Text>
        </Pressable>
        <Pressable onPress={() => setMethod("maya")}>
          <Text>🏦 Maya</Text>
        </Pressable>
      </View>

      <View>
        {" "}
        {/* Conditional Input based on method */}
        {method === "gcash" && <TextInput placeholder="GCash Number" />}
        {method === "maya" && <TextInput placeholder="Maya Account" />}
      </View>

      <PrimaryButton label="Confirm Payment" onPress={handlePayment} />
    </SafeAreaView>
    ```

  - [ ] Wire up state:

    ```typescript
    const [selectedMethod, setSelectedMethod] = useState("cash");
    const { currentBooking } = useBookingStore(); // Get from store
    ```

  - [ ] Test: Can select all payment methods, form shows/hides fields correctly

## 3.2 IMPLEMENT PAYMENT SUBMISSION (1 hour)

- [ ] **In payment form** `handlePayment()` function:
  - [ ] Create transaction object:

    ```typescript
    const transaction = {
      id: Math.random().toString(36).substr(2, 9),
      bookingId: currentBooking.id,
      amount: currentBooking.amount,
      method: selectedMethod,
      status: "completed",
      timestamp: new Date().toISOString(),
    };
    ```

  - [ ] Save transaction:

    ```typescript
    const existingTrans = await storage.getJSON("transactions", []);
    await storage.saveJSON("transactions", [...existingTrans, transaction]);
    ```

  - [ ] Update booking status:

    ```typescript
    await storage.updateBooking(currentBooking.id, {
      status: "confirmed",
      paymentMethod: selectedMethod,
      paidAt: new Date().toISOString(),
    });
    ```

  - [ ] Update Zustand store:

    ```typescript
    // In bookingStore, add this update
    updateCurrentBooking({ status: "confirmed" });
    ```

  - [ ] Navigate to success:
    ```typescript
    router.replace("/(client)/booking/payment/success");
    ```

- [ ] **Test:**
  - [ ] Payment form → select method → click pay
  - [ ] Should navigate to success screen
  - [ ] Check AsyncStorage has transaction + updated booking

## 3.3 UPDATE SUCCESS/FAILED SCREENS (30 min)

- [ ] **File:** `mobile/app/(client)/booking/payment/success.tsx`
  - [ ] Display:

    ```tsx
    <View>
      <Ionicons name="checkmark-circle" size={100} color="green" />
      <Text>Payment Successful!</Text>
      <Text>Order ID: {orderId}</Text>
      <Text>Amount: ₱{amount}</Text>
      <Text>Worker: {workerName}</Text>
      <Text>Scheduled: {date}</Text>
    </View>

    <PrimaryButton label="View Booking" onPress={...} />
    <OutlinedButton label="Back to Home" onPress={...} />
    ```

  - [ ] Wire buttons:
    ```typescript
    onPress={() => router.push(`/(client)/booking/${bookingId}`)}
    onPress={() => router.replace('/(client)/home')}
    ```

- [ ] **File:** `mobile/app/(client)/booking/payment/failed.tsx`
  - [ ] Similar structure but with error icon + "Retry" button

- [ ] **Test:**
  - [ ] Successfully pay → success screen with details
  - [ ] Click "Back to Home" → returns to home

## 3.4 UPDATE BOOKING LIST (1 hour)

- [ ] **File:** `mobile/app/(client)/booking/index.tsx` (AFTER navigation fix from Phase 1!)
  - [ ] Remove the old `useEffect` that resets navigation (should already be done in Phase 1)

  - [ ] Add new `useEffect` to load bookings:

    ```typescript
    useEffect(() => {
      const loadBookings = async () => {
        const bookings = await storage.getBookings(currentUser.id);
        setBookings(bookings);
      };
      loadBookings();
    }, []); // Run once on mount
    ```

  - [ ] Filter by active tab:

    ```typescript
    const filtered = bookings.filter(
      (b) => b.status === activeTab.toLowerCase(),
    );
    ```

  - [ ] Render in list:

    ```typescript
    <FlatList
      data={filtered}
      renderItem={({ item }) => (
        <BookingCard
          booking={item}
          onPress={() => router.push(`/(client)/booking/${item.id}`)}
        />
      )}
    />
    ```

  - [ ] Test:
    - [ ] Create booking + pay
    - [ ] Booking appears in "Completed" tab
    - [ ] Click booking → shows details

---

# ⭐ PHASE 4: SEARCH & DISCOVERY (Days 9-10)

**Estimated: 2-3 hours | Depends on Phase 1-2 ✓**

Users can find workers by searching and browsing.

## 4.1 CREATE SEARCH SCREEN (1.5 hours)

- [ ] **File:** Create `mobile/app/(client)/home/search.tsx` (new file)
  - [ ] Basic structure:

    ```tsx
    <SafeAreaView>
      <TextInput
        placeholder="Search services or workers..."
        value={query}
        onChangeText={setQuery}
      />

      <View>
        {" "}
        {/* Filters */}
        <Pressable onPress={() => setShowFilters(!showFilters)}>
          <Text>🔍 Filters</Text>
        </Pressable>
        {showFilters && (
          <>
            <Slider
              value={minRating}
              onValueChange={setMinRating}
              label="Min Rating"
            />
            <Slider
              value={maxPrice}
              onValueChange={setMaxPrice}
              label="Max Price"
            />
          </>
        )}
      </View>

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <WorkerCard worker={item} onPress={() => goToWorker(item)} />
        )}
      />
    </SafeAreaView>
    ```

  - [ ] Add state:

    ```typescript
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [minRating, setMinRating] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);
    ```

  - [ ] Implement search logic:

    ```typescript
    useEffect(() => {
      const search = async () => {
        let workers = await storage.getWorkers();

        // Filter by query
        if (query) {
          workers = workers.filter(
            (w) =>
              w.name.toLowerCase().includes(query.toLowerCase()) ||
              w.bio.toLowerCase().includes(query.toLowerCase()),
          );
        }

        // Filter by rating
        workers = workers.filter((w) => w.rating >= minRating);

        // Filter by price
        workers = workers.filter((w) => w.hourlyRate <= maxPrice);

        setResults(workers);
      };
      search();
    }, [query, minRating, maxPrice]);
    ```

  - [ ] Test:
    - [ ] Type "plumb" → should filter to plumber workers
    - [ ] Adjust price slider → results filter
    - [ ] No results → show empty state

## 4.2 CREATE WORKER DETAIL SCREEN (1 hour)

- [ ] **File:** Verify/Create `mobile/app/(client)/category/worker/[workerId].tsx`
  - [ ] Basic structure:

    ```tsx
    <SafeAreaView>
      <View>
        {" "}
        {/* Worker Header */}
        <Avatar source={worker.avatar} />
        <Text>{worker.name}</Text>
        <View>
          <StarRating rating={worker.rating} />
          <Text>({worker.ratingCount} reviews)</Text>
        </View>
      </View>

      <View>
        {" "}
        {/* Services & Rate */}
        <Text>Hourly Rate: ₱{worker.hourlyRate}</Text>
        <Text>Bio: {worker.bio}</Text>
      </View>

      <View>
        {" "}
        {/* Reviews */}
        <SectionHeader title="Reviews" />
        <FlatList
          data={reviews}
          renderItem={({ item }) => <ReviewCard review={item} />}
        />
      </View>

      <PrimaryButton label="Book Now" onPress={() => startBooking(worker)} />
    </SafeAreaView>
    ```

  - [ ] Load data:

    ```typescript
    useEffect(() => {
      const loadData = async () => {
        const worker = await storage.getWorkerById(workerId);
        const reviews = await storage.getReviews(workerId);
        setWorkerData({ ...worker, reviews });
      };
      loadData();
    }, [workerId]);
    ```

  - [ ] Wire "Book Now":

    ```typescript
    onPress={() => {
      // Set selected worker in store
      bookingStore.setSelectedWorker(worker);
      router.push('/(client)/booking/new');
    }}
    ```

  - [ ] Test:
    - [ ] Click worker from search → detail screen
    - [ ] See worker info + reviews
    - [ ] Click "Book Now" → booking flow starts

## 4.3 LINK SEARCH IN HOME (30 min)

- [ ] **File:** `mobile/app/(client)/home/index.tsx`
  - [ ] Update search bar onPress:

    ```typescript
    <Pressable onPress={() => router.push('/(client)/home/search')}>
      <SearchBar placeholder="Search..." editable={false} />
    </Pressable>
    ```

  - [ ] Test:
    - [ ] Home screen → click search → goes to search screen
    - [ ] Search → navigate to worker → can go back

---

# ⭐ PHASE 5: MESSAGING (Days 11-12)

**Estimated: 2 hours | Depends on Phase 1-2 ✓**

Chat between clients and workers with persistent history.

## 5.1 ENHANCE CHAT SCREEN (1 hour)

- [ ] **File:** `mobile/app/(client)/inbox/chat/[chatId].tsx`
  - [ ] Import storage:

    ```typescript
    import * as storage from "../../../../services/storage";
    ```

  - [ ] Load messages on mount:

    ```typescript
    useEffect(() => {
      const loadMessages = async () => {
        const msgs = await storage.getMessages(chatId);
        setMessages(msgs);
      };
      loadMessages();
    }, [chatId]);
    ```

  - [ ] Update send message function:

    ```typescript
    const send = async () => {
      if (!input.trim()) return;

      const message = {
        id: Math.random().toString(36).substr(2, 9),
        conversationId: chatId,
        senderId: currentUser.id,
        body: input.trim(),
        timestamp: new Date().toISOString(),
        attachments: [],
      };

      // Save to storage
      await storage.createMessage(message);

      // Update UI
      setMessages((prev) => [...prev, message]);
      setInput("");

      // Optional: Mock auto-reply after 2 seconds
      setTimeout(async () => {
        const reply = {
          id: Math.random().toString(36).substr(2, 9),
          conversationId: chatId,
          senderId: otherUser.id, // Mock worker ID
          body: "Thanks for your message! I'll respond soon.",
          timestamp: new Date().toISOString(),
          attachments: [],
        };
        await storage.createMessage(reply);
        setMessages((prev) => [...prev, reply]);
      }, 2000);
    };
    ```

  - [ ] Test:
    - [ ] Send message → appears in list
    - [ ] Close chat → reopen → message still there
    - [ ] Mock reply appears after 2 seconds

## 5.2 UPDATE CONVERSATION LIST (1 hour)

- [ ] **File:** `mobile/app/(client)/inbox/index.tsx` (AFTER navigation fix!)
  - [ ] Remove old useEffect with navigation reset (Phase 1)

  - [ ] Add new useEffect to load conversations:

    ```typescript
    useEffect(() => {
      const loadConversations = async () => {
        const convos = await storage.getConversations(currentUser.id);
        // Sort by last message date
        const sorted = convos.sort(
          (a, b) =>
            new Date(b.lastMessageAt).getTime() -
            new Date(a.lastMessageAt).getTime(),
        );
        setConversations(sorted);
      };
      loadConversations();
    }, []);
    ```

  - [ ] Render conversations:

    ```typescript
    <FlatList
      data={conversations}
      renderItem={({ item }) => (
        <ConversationItem
          conversation={item}
          onPress={() => router.push(`/(client)/inbox/chat/${item.id}`)}
        />
      )}
    />
    ```

  - [ ] Optional: Add "New Conversation" button:

    ```typescript
    <Pressable onPress={() => router.push('/(client)/home')}> {/* Or to worker picker */}
      <Text>➕ New Message</Text>
    </Pressable>
    ```

  - [ ] Test:
    - [ ] Send message in chat
    - [ ] Go back to inbox → conversation appears
    - [ ] Click → opens chat with message history

---

# ⭐ PHASE 6: REVIEWS & RATINGS (Days 13-14)

**Estimated: 1.5-2 hours | Depends on Phase 3 ✓**

Clients rate workers after completed bookings.

## 6.1 CREATE REVIEW SUBMISSION FLOW (1.5 hours)

- [ ] **File:** Create/Update `mobile/app/(client)/profile/rate-review/[bookingId].tsx`
  - [ ] Structure:

    ```tsx
    <SafeAreaView>
      <View>
        {" "}
        {/* Booking Summary */}
        <Text>Rate your experience</Text>
        <Text>
          {workerName} - {service}
        </Text>
        <Text>{bookingDate}</Text>
      </View>

      <View>
        {" "}
        {/* Star Rating */}
        <StarRating rating={rating} onRatingChange={setRating} />
        <Text>{rating} stars</Text>
      </View>

      <View>
        {" "}
        {/* Comment */}
        <TextInput
          placeholder="Share your feedback (optional)"
          value={comment}
          onChangeText={setComment}
          multiline
        />
      </View>

      <PrimaryButton label="Submit Review" onPress={handleSubmit} />
    </SafeAreaView>
    ```

  - [ ] Load booking data:

    ```typescript
    useEffect(() => {
      const loadBooking = async () => {
        const booking = await storage.getBookings();
        const b = booking.find((x) => x.id === bookingId);
        setBooking(b);
      };
      loadBooking();
    }, []);
    ```

  - [ ] Implement submit:

    ```typescript
    const handleSubmit = async () => {
      if (rating === 0) {
        Alert.alert("Please select a rating");
        return;
      }

      setLoading(true);
      try {
        const review = {
          id: Math.random().toString(36).substr(2, 9),
          bookingId,
          reviewerId: currentUser.id,
          workerId: booking.workerId,
          rating,
          comment,
          timestamp: new Date().toISOString(),
        };

        // Save review
        await storage.createReview(review);

        // Recalculate worker rating
        const workerReviews = await storage.getReviews(booking.workerId);
        const avgRating =
          workerReviews.reduce((sum, r) => sum + r.rating, 0) /
          workerReviews.length;

        // Update worker
        await storage.updateWorker(booking.workerId, {
          rating: parseFloat(avgRating.toFixed(1)),
          ratingCount: workerReviews.length,
        });

        Alert.alert("Success", "Review submitted!");
        router.replace("/(client)/profile");
      } catch (err) {
        Alert.alert("Error", "Failed to submit review");
      } finally {
        setLoading(false);
      }
    };
    ```

  - [ ] Test:
    - [ ] Complete a booking
    - [ ] Navigate to review
    - [ ] Submit review → worker rating updates

## 6.2 DISPLAY REVIEWS ON WORKER PROFILE (30 min)

- [ ] **File:** `mobile/app/(client)/category/worker/[workerId].tsx`
  - [ ] Already loading reviews, just ensure display:

    ```typescript
    <View>
      <Text style={{fontSize: 20, fontWeight: 'bold'}}>
        Reviews ({reviews.length})
      </Text>
      <FlatList
        data={reviews}
        renderItem={({ item }) => (
          <ReviewCard
            review={item}
            onPress={() => {}}
          />
        )}
      />
      {reviews.length === 0 && (
        <Text>No reviews yet</Text>
      )}
    </View>
    ```

  - [ ] Test:
    - [ ] Worker with reviews → reviews show
    - [ ] New review submitted → updates in real-time

---

# ⭐ PHASE 7: WORKER APP FEATURES (Days 15-16)

**Estimated: 1.5-2 hours | Depends on Phase 1-3 ✓**

Worker side: manage job requests, availability, earnings.

## 7.1 ENHANCE WORKER HOME (1 hour)

- [ ] **File:** `mobile/app/(worker)/home/index.tsx` (AFTER navigation fix!)
  - [ ] Remove old useEffect with navigation reset (Phase 1)

  - [ ] Wire availability toggle:

    ```typescript
    const handleToggleAvailability = async () => {
      const currentWorker = useAuthStore((s) => s.user);
      const newStatus = available ? "unavailable" : "available";

      await storage.updateWorker(currentWorker.userId, {
        status: newStatus,
      });

      setAvailable(!available);
    };
    ```

  - [ ] Wire job requests list:

    ```typescript
    useEffect(() => {
      const loadRequests = async () => {
        const allBookings = await storage.getBookings(currentWorker.userId);
        const pending = allBookings.filter(
          (b) => b.workerId === currentWorker.id && b.status === "pending",
        );
        setJobRequests(pending);
      };
      loadRequests();
    }, []);
    ```

  - [ ] Display requests in list with click handler

  - [ ] Test:
    - [ ] Toggle availability → changes state
    - [ ] See pending job requests

## 7.2 JOB REQUESTS MANAGEMENT (30 min)

- [ ] **File:** `mobile/app/(worker)/requests/index.tsx`
  - [ ] Load requests by status:

    ```typescript
    useEffect(() => {
      const loadRequests = async () => {
        const allBookings = await storage.getBookings(currentWorker.userId);
        const filtered = allBookings.filter(
          (b) =>
            b.workerId === currentWorker.id &&
            b.status === activeTab.toLowerCase(),
        );
        setRequests(filtered);
      };
      loadRequests();
    }, [activeTab]);
    ```

  - [ ] Accept button:

    ```typescript
    const handleAccept = async (bookingId) => {
      await storage.updateBooking(bookingId, {
        status: "accepted",
        acceptedAt: new Date().toISOString(),
      });
      // Refresh list
      loadRequests();
    };
    ```

  - [ ] Decline button:

    ```typescript
    const handleDecline = async (bookingId) => {
      await storage.updateBooking(bookingId, {
        status: "declined",
        declinedAt: new Date().toISOString(),
      });
      // Refresh list
      loadRequests();
    };
    ```

  - [ ] Add confirmation dialog before action

  - [ ] Test:
    - [ ] See requests
    - [ ] Accept request → moves to "Active"
    - [ ] Decline → request disappears

## 7.3 EARNINGS SCREEN (30 min)

- [ ] **File:** `mobile/app/(worker)/earnings/index.tsx` (AFTER navigation fix!)
  - [ ] Remove old useEffect with navigation reset (Phase 1)

  - [ ] Load earnings:

    ```typescript
    useEffect(() => {
      const loadEarnings = async () => {
        const allBookings = await storage.getBookings(currentWorker.userId);
        const completed = allBookings.filter(
          (b) => b.workerId === currentWorker.id && b.status === "completed",
        );
        const total = completed.reduce((sum, b) => sum + b.amount, 0);
        setTotalEarnings(total);
        setTransactions(completed);
      };
      loadEarnings();
    }, []);
    ```

  - [ ] Display:

    ```typescript
    <View>
      <Text style={{fontSize: 32, fontWeight: 'bold'}}>₱{totalEarnings}</Text>
      <Text>Total Earnings</Text>
    </View>

    <FlatList
      data={transactions}
      renderItem={({ item }) => (
        <TransactionItem transaction={item} />
      )}
    />
    ```

  - [ ] Test:
    - [ ] Complete a booking → shows in earnings

---

# ⭐ PHASE 8: DEV TOOLS (Days 17-18)

**Estimated: 1-1.5 hours | Optional but helpful**

Admin utilities for testing and data inspection.

## 8.1 CREATE DEV TOOLS SCREEN (1 hour)

- [ ] **File:** Create `mobile/app/dev-tools.tsx` (new file, dev-only)
  - [ ] Basic structure:

    ```tsx
    <SafeAreaView>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>
        🛠️ Developer Tools
      </Text>

      <Section title="Storage Management">
        <Button title="🔍 View All Storage" onPress={viewStorage} />
        <Button title="🗑️ Clear All Data" onPress={clearStorage} />
        <Button title="🌱 Seed Demo Data" onPress={seedData} />
      </Section>

      <Section title="User Management">
        <Button title="➕ Add Test Client" onPress={addClientUser} />
        <Button title="➕ Add Test Worker" onPress={addWorkerUser} />
      </Section>

      <Section title="Info">
        <Text>Storage Size: {storageSize} bytes</Text>
        <Text>App Version: {appVersion}</Text>
      </Section>

      <Button title="Close Dev Tools" onPress={() => router.back()} />
    </SafeAreaView>
    ```

  - [ ] Implement viewStorage:

    ```typescript
    const viewStorage = async () => {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      console.log("All Storage:", values);
      Alert.alert("See DevTools Logs");
    };
    ```

  - [ ] Implement clearStorage (with warning):

    ```typescript
    const clearStorage = async () => {
      Alert.alert("Warning", "This will delete all app data!", [
        { text: "Cancel", onPress: () => {} },
        {
          text: "Clear",
          onPress: async () => {
            await AsyncStorage.clear();
            Alert.alert("All data cleared");
          },
        },
      ]);
    };
    ```

  - [ ] Implement seedData:
    ```typescript
    const seedData = async () => {
      await AsyncStorage.clear();
      await initializeAppStorage();
      Alert.alert("Demo data seeded");
    };
    ```

- [ ] **Gate behind dev mode:**

  ```typescript
  // In app/_layout.tsx
  if (!__DEV__) {
    // Hide dev tools in production
  }
  ```

- [ ] **Test:**
  - [ ] Can view storage keys
  - [ ] Can clear without crashing
  - [ ] Can reseed data

---

# ⭐ PHASE 9: POLISH & TESTING (Days 19-20)

**Estimated: 1.5-2 hours | Final touches**

Error handling, loading states, empty states.

## 9.1 ADD ERROR HANDLING (30 min)

- [ ] Wrap all storage calls in try/catch
- [ ] Display user-friendly error messages
- [ ] Don't show console errors in UI

## 9.2 ADD EMPTY STATES (30 min)

- [ ] No bookings → show EmptyState with "Book a service" CTA
- [ ] No messages → show EmptyState with "Start a conversation" CTA
- [ ] No reviews → show EmptyState
- [ ] No search results → show "No workers found"

## 9.3 ADD LOADING STATES (30 min)

- [ ] Show LoadingSkeleton while fetching bookings
- [ ] Show LoadingSkeleton while loading worker details
- [ ] Show loading spinner on buttons during submission

## 9.4 FULL FLOW TEST (30 min)

Run through complete user journey:

- [ ] **Client Journey:**
  - [ ] Sign up as client
  - [ ] Browse home
  - [ ] Search for "plumber"
  - [ ] Click worker → see reviews
  - [ ] Book worker
  - [ ] Pay with cash
  - [ ] See booking in list
  - [ ] Message worker
  - [ ] Review worker
  - [ ] Check profile/transactions

- [ ] **Worker Journey:**
  - [ ] Sign up as worker
  - [ ] Toggle availability
  - [ ] See job requests
  - [ ] Accept request
  - [ ] Message client
  - [ ] Check earnings

- [ ] **Cross-check:**
  - [ ] Data persists after close/reopen
  - [ ] No crashes
  - [ ] All navigation works
  - [ ] Storage correctly updated

---

## COMPLETION CHECKLIST

| Phase | Items                           | Status |
| ----- | ------------------------------- | ------ |
| **1** | Fix Nav (5) + storage.ts + init | ⬜     |
| **2** | Sign-up + sign-in + hydrate     | ⬜     |
| **3** | Payment form + booking flow     | ⬜     |
| **4** | Search screen + worker detail   | ⬜     |
| **5** | Chat messaging                  | ⬜     |
| **6** | Reviews & ratings               | ⬜     |
| **7** | Worker requests + earnings      | ⬜     |
| **8** | Dev tools                       | ⬜     |
| **9** | Polish + testing                | ⬜     |

**Total Checkboxes:** ~80 items  
**Estimated Completion:** 14-20 working days

---

## QUICK REFERENCE: Key Files

**Create (New):**

- `mobile/services/storage.ts`
- `mobile/services/storageInitialization.ts`
- `mobile/app/(client)/home/search.tsx`
- `mobile/app/(client)/booking/payment/index.tsx`
- `mobile/app/dev-tools.tsx`

**Modify (Existing):**

- 5 files with navigation freezes
- `app/(auth)/sign-up.tsx`
- `app/(auth)/sign-in.tsx`
- `store/authStore.ts`
- `store/bookingStore.ts`
- Chat/inbox/profile screens

**No Changes Needed:**

- Components (already built)
- UI utilities
- Constants
